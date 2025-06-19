import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const FolderForm = ({ onFolderCreated, onClose }) => {
  const [folderData, setFolderData] = useState({
    name: '',
    description: '',
    department: '',
    access: 'private'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFolderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!folderData.name.trim() || !folderData.department) {
      toast.error('Folder name and department are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/folders', folderData);
      toast.success('Folder created successfully!');
      onFolderCreated(response.data);
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create folder');
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-emerald-400 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gradient-animate">Create New Folder</h2>
        <button onClick={onClose} className="text-emerald-100 hover:text-red-500">
          <i className="fas fa-times"></i>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-emerald-100">
            Folder Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={folderData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-emerald-100">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={folderData.description}
            onChange={handleInputChange}
            rows="3"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-emerald-100">
            Department
          </label>
          <select
            id="department"
            name="department"
            value={folderData.department}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">Select Department</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
          </select>
        </div>

        <div>
          <label htmlFor="access" className="block text-sm font-medium text-emerald-100">
            Access Level
          </label>
          <select
            id="access"
            name="access"
            value={folderData.access}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="private">Private</option>
            <option value="department">Department Only</option>
            <option value="public">Public</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-emerald-100 bg-emerald-500 hover:bg-emerald-700 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-emerald-100 bg-emerald-900 hover:bg-emerald-700 rounded-md"
          >
            Create Folder
          </button>
        </div>
      </form>
    </div>
  );
};

FolderForm.propTypes = {
  onFolderCreated: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default FolderForm;
