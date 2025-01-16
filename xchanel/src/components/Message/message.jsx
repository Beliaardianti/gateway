import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const MessageLogs = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showExportModal, setShowExportModal] = useState(false);

    const formatDate = (isoDate) => {
        if (!isoDate) return "-";
        const date = new Date(isoDate);
        const dateStr = date.toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
        });
        const timeStr = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });
        return `${dateStr}, ${timeStr}`;
    };

    const formatDateForInput = (isoDate) => {
        if (!isoDate) return "";
        return isoDate.split(".")[0];
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/submit_log"
                );
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredData = data.filter((item) => {
        const matchesSearch = !searchTerm
            ? true
            : Object.values(item).some(
                  (val) =>
                      val &&
                      val
                          .toString()
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
              );

        // Filter tanggal
        if (startDate || endDate) {
            const itemDate = new Date(item.created_at);
            itemDate.setHours(0, 0, 0, 0);

            let start = null;
            let end = null;

            if (startDate) {
                start = new Date(startDate);
                start.setHours(0, 0, 0, 0);
            }

            if (endDate) {
                end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
            }

            const matchesDateRange =
                (!start || itemDate >= start) && (!end || itemDate <= end);

            return matchesSearch && matchesDateRange;
        }

        return matchesSearch;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Export to Excel
    const exportToExcel = () => {
        const dataToExport = filteredData.map((item) => ({
            ...item,
            created_at: formatDate(item.created_at),
            dlr_timestamp: formatDate(item.dlr_timestamp),
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Message Logs");

        const fileName = `message_logs_${
            startDate ? formatDate(startDate) : "start"
        }_to_${endDate ? formatDate(endDate) : "end"}.xlsx`;
        XLSX.writeFile(workbook, fileName);
        setShowExportModal(false);
    };

    // Export to CSV
    const exportToCSV = () => {
        const dataToExport = filteredData.map((item) => ({
            ...item,
            created_at: formatDate(item.created_at),
            dlr_timestamp: formatDate(item.dlr_timestamp),
        }));

        const headers = Object.keys(dataToExport[0]).join(",");
        const csvData = dataToExport
            .map((row) =>
                Object.values(row)
                    .map((value) =>
                        typeof value === "string" ? `"${value}"` : value
                    )
                    .join(",")
            )
            .join("\n");

        const csv = `${headers}\n${csvData}`;
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const fileName = `message_logs_${
            startDate ? formatDate(startDate) : "start"
        }_to_${endDate ? formatDate(endDate) : "end"}.csv`;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        setShowExportModal(false);
    };

    // Export Modal
    const ExportModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                <h3 className="text-lg font-semibold mb-4">Export Data</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date
                        </label>
                        <input
                            type="date"
                            value={startDate ? startDate.split("T")[0] : ""}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full border rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Date
                        </label>
                        <input
                            type="date"
                            value={endDate ? endDate.split("T")[0] : ""}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full border rounded-md p-2"
                        />
                    </div>
                    {startDate && endDate && (
                        <div className="text-sm text-gray-600">
                            Will export data from {formatDate(startDate)} to{" "}
                            {formatDate(endDate)}
                        </div>
                    )}
                    <div className="flex space-x-2">
                        <button
                            onClick={exportToExcel}
                            disabled={!startDate || !endDate}
                            className={`flex-1 px-4 py-2 rounded ${
                                !startDate || !endDate
                                    ? "bg-gray-300 text-gray-500"
                                    : "bg-green-600 text-white hover:bg-green-700"
                            }`}
                        >
                            Export Excel
                        </button>
                        <button
                            onClick={exportToCSV}
                            disabled={!startDate || !endDate}
                            className={`flex-1 px-4 py-2 rounded ${
                                !startDate || !endDate
                                    ? "bg-gray-300 text-gray-500"
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                        >
                            Export CSV
                        </button>
                    </div>
                    <button
                        onClick={() => {
                            setShowExportModal(false);
                            setStartDate("");
                            setEndDate("");
                        }}
                        className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="h-screen bg-gray-100 p-6 overflow-auto">
            <div className="max-w-8xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Message Logs
                        </h1>
                        <p className="text-gray-500">
                            View all the messages sent.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowExportModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Export Data
                    </button>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder="Search messages..."
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>

                <div className="text-gray-600 mb-4">
                    <span>Found </span>
                    <span className="font-medium">{filteredData.length}</span>
                    <span> results</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {[
                                    "#",
                                    "msgid",
                                    "source_addr",
                                    "destination_addr",
                                    "rate",
                                    "charge",
                                    "status",
                                    "uid",
                                    "campaign",
                                    "created_at",
                                    "dlr_timestamp",
                                ].map((header) => (
                                    <th
                                        key={header}
                                        className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((row, index) => (
                                <tr
                                    key={row.msgid}
                                    className="text-gray-700 hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 border-b">
                                        {indexOfFirstItem + index + 1}
                                    </td>
                                    <td className="px-6 py-4 border-b break-all">
                                        {row.msgid}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {row.source_addr}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {row.destination_addr}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {row.rate}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {row.charge}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {row.uid}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {row.campaign}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {formatDate(row.created_at)}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {formatDate(row.status_at)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <div className="text-gray-600">
                        Showing {indexOfFirstItem + 1} to{" "}
                        {Math.min(indexOfLastItem, filteredData.length)} of{" "}
                        {filteredData.length} entries
                    </div>
                    <div className="flex space-x-1">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 rounded ${
                                currentPage === 1
                                    ? "bg-gray-100 text-gray-400"
                                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                            }`}
                        >
                            Previous
                        </button>

                        {Array.from({
                            length: Math.ceil(
                                filteredData.length / itemsPerPage
                            ),
                        }).map((_, index) => {
                            const pageNumber = index + 1;

                            if (
                                pageNumber === 1 ||
                                pageNumber ===
                                    Math.ceil(
                                        filteredData.length / itemsPerPage
                                    ) ||
                                (pageNumber >= currentPage - 1 &&
                                    pageNumber <= currentPage + 1)
                            ) {
                                return (
                                    <button
                                        key={index}
                                        onClick={() => paginate(pageNumber)}
                                        className={`px-3 py-1 rounded ${
                                            currentPage === pageNumber
                                                ? "bg-black text-white"
                                                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                        }`}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            }

                            // Tampilkan ellipsis untuk range yang di-skip
                            if (
                                pageNumber === 2 ||
                                pageNumber ===
                                    Math.ceil(
                                        filteredData.length / itemsPerPage
                                    ) -
                                        1
                            ) {
                                return (
                                    <span key={index} className="px-2">
                                        ...
                                    </span>
                                );
                            }

                            return null;
                        })}

                        {/* Next button */}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={
                                currentPage ===
                                Math.ceil(filteredData.length / itemsPerPage)
                            }
                            className={`px-3 py-1 rounded ${
                                currentPage ===
                                Math.ceil(filteredData.length / itemsPerPage)
                                    ? "bg-gray-100 text-gray-400"
                                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {showExportModal && <ExportModal />}
        </div>
    );
};

export default MessageLogs;
