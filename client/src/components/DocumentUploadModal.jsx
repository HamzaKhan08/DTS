import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const DocumentUploadModal = ({ isOpen, onClose, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    uploaderName: '',
    designation: '',
    department: '',
    priority: 'Medium',
    description: '',
    tags: ''
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('File size should be less than 10MB');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file');
      return;
    }
    if (!formData.uploaderName || !formData.designation || !formData.department) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsUploading(true);
    const formPayload = new FormData();
    formPayload.append('file', file);
    formPayload.append('uploaderName', formData.uploaderName);
    formPayload.append('designation', formData.designation);
    formPayload.append('department', formData.department);
    formPayload.append('priority', formData.priority);
    formPayload.append('description', formData.description);
    formPayload.append('tags', formData.tags);

    try {
      const response = await axios.post('http://localhost:5001/api/documents/upload', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Document uploaded successfully!');
      onUploadSuccess(response.data);
      onClose();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.message || 'Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-gradient-animate font-bold text-emerald-100">Upload Document</h2>
          <button
            onClick={onClose}
            className="text-black hover:text-orange-500"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-black">
              Document File *
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-800 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <i className="fas fa-upload text-gradient-animate text-emerald-100 text-3xl mb-3"></i>
                <div className="flex text-sm text-black">
                  <label htmlFor="file-upload" className="relative cursor-pointer text-gradient-animate rounded-md font-medium text-emerald-900 hover:text-emerald-900 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-300">
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-black">
                  PDF, DOC, DOCX, XLS, XLSX up to 10MB
                </p>
                {file && (
                  <p className="text-sm text-gray-600">
                    Selected: {file.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Uploader Details */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-black">
                Your Name *
              </label>
              <input
                type="text"
                name="uploaderName"
                value={formData.uploaderName}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black">
                Designation *
              </label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md shadow-sm"
              >
                <option value="">Select Designation</option>
                <option value="HOD">HOD</option>
                <option value="Professor">Professor</option>
                <option value="Associate Professor">Assistant Professor</option>
                <option value="Vice Chancellor">Vice Chancellor</option>
                <option value="Chancellor">Chancellor</option>
                <option value="Dean">Dean</option>
                <option value="Registrar">Registrar</option>
                <option value="Librarian">Librarian</option>
                <option value="Pro Vice Chancellor">Pro Vice Chancellor</option>
                
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-black">
                Department *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md shadow-sm"
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science and Engineering/AI</option>
                <option value="Medical Science">Medical Sciences</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Biotechnology">Biotechnology</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-black">
                Priority of Document
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md shadow-sm"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-black">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="mt-1 block w-full rounded-md shadow-sm"
              placeholder="Add a brief description of the document..."
            ></textarea>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-black">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md shadow-sm"
              placeholder="Enter tags separated by commas"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-black bg-orange-400 hover:bg-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-4 py-2 text-sm font-medium text-black bg-emerald-300 hover:bg-emerald-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Uploading...
                </>
              ) : (
                'Upload Document'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

DocumentUploadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUploadSuccess: PropTypes.func.isRequired
};

export default DocumentUploadModal;