import { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import axios from 'axios';
import DocumentUploadModal from './DocumentUploadModal';

const RecentDocuments = () => {

  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [comment, setComment] = useState('');
  const [shareEmail, setShareEmail] = useState('');
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [documentHistory, setDocumentHistory] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    department: 'all'
  });
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5001/api/documents');
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && !event.target.closest('.action-dropdown')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  // Helper Functions
  const getStatusBadgeClass = (status) => {
    const statusClasses = {
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityBadgeClass = (priority) => {
    const priorityClasses = {
      High: 'bg-red-100 text-red-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      Low: 'bg-blue-100 text-blue-800'
    };
    return priorityClasses[priority] || 'bg-gray-100 text-gray-800';
  };

   // Add handleUploadSuccess function
   const handleUploadSuccess = (newDocument) => {
    setDocuments(prev => [newDocument, ...prev]);
    toast.success('Document uploaded successfully!');
  };

  //handle download function
  const handleDownload = async (doc) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/documents/download/${doc._id}`, {
        responseType: 'blob'
      });
      saveAs(response.data, doc.originalName);
      toast.success('Document downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download document');
    }
  };

   // Add handleStatusChange function
   const handleStatusChange = async (docId, newStatus) => {
    try {
      const response = await axios.patch(`http://localhost:5001/api/documents/${docId}/status`, {
        status: newStatus
      });
      setDocuments(docs => docs.map(doc => 
        doc._id === docId ? response.data : doc
      ));
      toast.success(`Document ${newStatus} successfully`);
    } catch (error) {
      console.error('Status update error:', error);
      toast.error('Failed to update document status');
    }
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'ascending' ? 'descending' : 'ascending'
    }));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleApprove = (docId) => {
    handleStatusChange(docId, 'approved');
  };

  const handleReject = (docId) => {
    handleStatusChange(docId, 'rejected');
  };

  const handleShare = (doc) => {
    setSelectedDocument(doc);
    setShowShareModal(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleArchive = (docId) => {
    setDocuments(documents.map(doc => 
      doc.id === docId ? {...doc, status: 'archived'} : doc
    ));
    toast.info('Document archived.');
  };

  const handleAddComment = (doc) => {
    setSelectedDocument(doc);
    setShowCommentModal(true);
  };

  const submitComment = () => {
    if (!comment.trim()) return;
    
    setDocuments(documents.map(doc => 
      doc.id === selectedDocument.id 
        ? { ...doc, comments: doc.comments + 1 }
        : doc
    ));
    
    toast.success('Comment added successfully!');
    setComment('');
    setShowCommentModal(false);
    setSelectedDocument(null);
  };

  const submitShare = () => {
    if (!shareEmail.trim()) return;
    
    setDocuments(documents.map(doc => 
      doc.id === selectedDocument.id 
        ? { ...doc, sharedWith: [...doc.sharedWith, shareEmail] }
        : doc
    ));
    
    toast.success('Document shared successfully!');
    setShareEmail('');
    setShowShareModal(false);
    setSelectedDocument(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFileIcon = (type) => {
    const icons = {
      pdf: 'fas fa-file-pdf text-red-500',
      word: 'fas fa-file-word text-blue-500',
      excel: 'fas fa-file-excel text-green-500',
      default: 'fas fa-file text-gray-500'
    };
    return icons[type] || icons.default;
  };

  const viewHistory = (doc) => {
    setSelectedDocument(doc);
    // Simulate fetching document history
    setDocumentHistory([
      { date: '2024-03-20', action: 'Created', user: 'Dr. Sarah Wilson' },
      { date: '2024-03-21', action: 'Modified', user: 'Dr. John Doe' },
      { date: '2024-03-22', action: 'Shared', user: 'Dr. Emily Brown' }
    ]);
    setShowHistoryModal(true);
  };

  const toggleDropdown = (docId) => {
    setActiveDropdown(activeDropdown === docId ? null : docId);
  };

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filters.status === 'all' || doc.status === filters.status;
    const matchesPriority = filters.priority === 'all' || doc.priority === filters.priority;
    const matchesDepartment = filters.department === 'all' || doc.department === filters.department;

    return matchesSearch && matchesStatus && matchesPriority && matchesDepartment;
  });

  // Sort documents
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
    return 0;
  });

  const handleCloseModal = () => {
    setShowFilterModal(false);
  };

  return (
    <div className="bg-orange-300 rounded-lg shadow">
      {/* Header and Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Recent Documents</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search documents..."
                className="pl-10 pr-4 py-2 border border-black rounded-lg focus:ring-orange-400 focus:border-orange-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors"
            >
              <i className="fas fa-upload mr-2"></i>
              Upload Document
            </button>
            <button 
            onClick={() => setShowFilterModal(true)}
            className='px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-orange-500 transition-colors'>
              <i className='fas fa-filter mr-2'></i>
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className='flex justify-center items-center py-8'>
            <i className='fas fa-spinner fa-spin text-2xl text-orange-600'></i>
            </div>
        ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}>
                Document
                {sortConfig.key === 'name' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}>
                Status
                {sortConfig.key === 'status' && (
                  <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
                )}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedDocuments.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <i className={`${getFileIcon(doc.type)} mr-3 text-lg`}></i>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                      <div className="text-sm text-gray-500">{formatFileSize(doc.size)}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    <div>Uploaded by: {doc.uploadedBy}</div>
                    <div className="text-gray-500">{doc.position} - {doc.department}</div>
                    <div className="text-gray-500">{formatDate(doc.uploadedAt)}</div>
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityBadgeClass(doc.priority)} mt-1`}>
                      {doc.priority} Priority
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(doc.status)}`}>
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleApprove(doc.id)}
                      className={`text-green-600 hover:text-green-900 ${
                        doc.status === 'approved' ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={doc.status === 'approved'}
                      title="Approve"
                    >
                      <i className="fas fa-check"></i>
                    </button>
                    <button
                      onClick={() => handleReject(doc.id)}
                      className={`text-red-600 hover:text-red-900 ${
                        doc.status === 'rejected' ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={doc.status === 'rejected'}
                      title="Reject"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                    <button
                      onClick={() => handleDownload(doc)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Download"
                    >
                      <i className="fas fa-download"></i>
                    </button>
                    <div className="relative action-dropdown">
                      <button
                        onClick={() => toggleDropdown(doc.id)}
                        className="text-gray-600 hover:text-gray-900"
                        title="More options"
                      >
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                      
                      {activeDropdown === doc.id && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                          <div className="py-1" role="menu">
                            <button
                              onClick={() => handleShare(doc)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <i className="fas fa-share mr-2"></i> Share
                            </button>
                            <button
                              onClick={() => handleAddComment(doc)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <i className="fas fa-comment mr-2"></i> Add Comment
                              <span className="ml-auto bg-gray-200 px-2 rounded-full text-xs">
                                {doc.comments}
                              </span>
                            </button>
                            <button
                              onClick={() => viewHistory(doc)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <i className="fas fa-history mr-2"></i> View History
                            </button>
                            <button
                              onClick={() => handlePrint(doc)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <i className="fas fa-print mr-2"></i> Print
                            </button>
                            {doc.status !== 'archived' && (
                              <button
                                onClick={() => handleArchive(doc.id)}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                <i className="fas fa-archive mr-2"></i> Archive
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>

      {/* Comment Modal */}
      {showCommentModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add Comment</h2>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Document: {selectedDocument?.name}
              </p>
              <textarea
                className="w-full p-2 border rounded-lg focus:ring-orange-400 focus:border-orange-400"
                rows="4"
                placeholder="Enter your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCommentModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={submitComment}
                className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Share Document</h2>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Share {selectedDocument?.name} with:
              </p>
              <input
                type="email"
                className="w-full p-2 border rounded-lg focus:ring-orange-400 focus:border-orange-400"
                placeholder="Enter email address"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={submitShare}
                className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-white bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Document History</h2>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-4">
                History for: {selectedDocument?.name}
              </p>
              <div className="space-y-4">
                {documentHistory.map((history, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium">{history.action}</span> by {history.user}
                    </div>
                    <div className="text-gray-500">{history.date}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowHistoryModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative">
            <h2 className="text-xl font-bold mb-4">Filter Documents</h2>
            <button
            onClick={handleCloseModal}
            className="absolute top-8 right-6 text-red-500"
            aria-label='Close modal'
          >
            <i className="fas fa-times text-xl"></i>
          </button>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Status
                </label>
                <select
                  className="w-full p-2 border rounded-lg focus:ring-orange-400 focus:border-orange-400"
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  className="w-full p-2 border rounded-lg focus:ring-orange-400 focus:border-orange-400"
                  value={filters.priority}
                  onChange={(e) => setFilters({...filters, priority: e.target.value})}
                >
                  <option value="all">All</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  className="w-full p-2 border rounded-lg focus:ring-orange-400 focus:border-orange-400"
                  value={filters.department}
                  onChange={(e) => setFilters({...filters, department: e.target.value})}
                >
                  <option value="all">All</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => {
                  setFilters({
                    status: 'all',
                    priority: 'all',
                    department: 'all',
                    dateRange: 'all'
                  });
                }}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Reset
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
      <DocumentUploadModal
  isOpen={showUploadModal}
  onClose={() => setShowUploadModal(false)}
  onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
};

RecentDocuments.propTypes = {};

export default RecentDocuments;