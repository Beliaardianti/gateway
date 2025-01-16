import React, { useState } from 'react';


const App = () => {
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedGroups = groups.map((group, index) =>
        index === editIndex ? { ...formData, dateCreated: group.dateCreated } : group
      );
      setGroups(updatedGroups);
      setEditIndex(null);
    } else {
      setGroups([...groups, { ...formData, dateCreated: new Date().toLocaleDateString() }]);
    }
    setFormData({ name: '', description: '' });
    setShowModal(false);
  };

  const handleDelete = (index) => {
    setGroups(groups.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(groups[index]);
    setShowModal(true);
  };

  const handleNewGroup = () => {
    setEditIndex(null);
    setFormData({ name: '', description: '' });
    setShowModal(true);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Contact Groups</h1>
        <button
          className="bg-black text-white py-2 px-4 rounded"
          onClick={handleNewGroup}
        >
          + New Group
        </button>
      </div>

      <table className="table-auto w-full text-left border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Group Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Date Created</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {groups.length > 0 ? (
            groups.map((group, index) => (
              <tr key={index} className="border-t border-gray-300">
                <td className="px-4 py-2">{group.name}</td>
                <td className="px-4 py-2">{group.description}</td>
                <td className="px-4 py-2">{group.dateCreated}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-black hover:underline mr-2"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">No groups available</td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              {editIndex !== null ? 'Edit Contact Group' : 'Create Contact Group'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="border border-gray-300 rounded w-full p-2"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="border border-gray-300 rounded w-full p-2"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black text-white py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
