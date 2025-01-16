import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
    Home,
    MessageCircle,
    Users,
    User,
    LogOut,
    ChevronDown,
} from "lucide-react";

const Sidebar = ({ onLogout }) => {
    const navigate = useNavigate();
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        setUserEmail(email || "User");

        const fetchAccounts = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/submit_log"
                );
                setAccounts(response.data);
            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
        };
        fetchAccounts();
    }, []);

    const handleAccountSelect = (account) => {
        setSelectedAccount(account.uid);
        setIsAccountDropdownOpen(false);
        console.log(`Selected Account: ${account.uid}`);
    };

    const menuItems = [
        { icon: Home, label: "Dashboard", path: "/" },
        { icon: MessageCircle, label: "Message Logs", path: "/messages" },
        { icon: Users, label: "Contacts & Groups", path: "/contact" },
    ];

    const handleLogout = () => {
        onLogout();
        localStorage.removeItem("userEmail");
        navigate("/login");
    };

    return (
        <div className="w-64 h-screen bg-white flex flex-col">
            <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                    <img
                        src="/api/placeholder/40/40"
                        alt="Profile"
                        className="w-9 h-9 rounded-full bg-gray-100"
                    />
                    <span className="text-sm text-gray-900">
                        Welcome, {userEmail}
                    </span>
                </div>

            
                <div className="relative">
                    <button
                        onClick={() =>
                            setIsAccountDropdownOpen(!isAccountDropdownOpen)
                        }
                        className="w-full flex items-center gap-2 py-1"
                    >
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm">
                            {selectedAccount || "Select Account"}
                        </span>
                        <ChevronDown
                            className={`w-4 h-4 ml-auto transition-transform ${
                                isAccountDropdownOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {isAccountDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded shadow-lg z-50">
                            {accounts.map((account, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAccountSelect(account)}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray text-black"
                                >
                                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                    {account.uid}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        
            <div className="flex-1">
                <p className="px-4 mb-2 text-gray-600 text-sm">Menu</p>
                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-2 text-sm ${
                                    isActive
                                        ? "text-blue-600 bg-blue-50"
                                        : "text-gray-700 hover:bg-gray-50"
                                }`
                            }
                        >
                            <item.icon
                                className="w-5 h-5 mr-3"
                                strokeWidth={1.5}
                            />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

     
            <div className="p-4 flex items-center justify-between text-sm text-gray-700 border-t">
                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        `flex items-center ${
                            isActive ? "text-blue-600" : "hover:text-blue-600"
                        }`
                    }
                >
                    <User className="w-5 h-5 mr-2" strokeWidth={1.5} />
                    <span>Profile</span>
                </NavLink>
                <button
                    onClick={handleLogout}
                    className="flex items-center hover:text-red-600"
                >
                    <LogOut className="w-5 h-5 mr-2" strokeWidth={1.5} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
