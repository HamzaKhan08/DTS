import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DocumentUploadModal from "../components/DocumentUploadModal";
// import { saveAs } from "file-saver";
import Document from "./Document";
import RecentActivity from "../components/RecentActivity";
import { useNavigate } from "react-router-dom";
import FolderForm from "../components/FolderForm";

const Dashboard = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    department: "all",
  });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [comment, setComment] = useState("");
  const [shareEmail, setShareEmail] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [documentHistory, setDocumentHistory] = useState([]);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5001/api/documents");
      setDocuments(response.data);
    } catch {
      toast.error("Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = (newDocument) => {
    setDocuments((prev) => [newDocument, ...prev]);
    toast.success("Document uploaded successfully!");
  };

  const handleStatusChange = async (docId, newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:5001/api/documents/${docId}/status`,
        {
          status: newStatus,
        }
      );
      setDocuments((docs) =>
        docs.map((doc) => (doc._id === docId ? response.data : doc))
      );
      toast.success(`Document ${newStatus} successfully`);
    } catch {
      toast.error("Failed to update document status");
    }
  };

  const toggleDropdown = (docId) => {
    setActiveDropdown(activeDropdown === docId ? null : docId);
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.uploadedBy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.uploadedBy.department
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filters.status === "all" || doc.status === filters.status;
    const matchesPriority =
      filters.priority === "all" || doc.priority === filters.priority;
    const matchesDepartment =
      filters.department === "all" ||
      doc.uploadedBy.department === filters.department;

    return (
      matchesSearch && matchesStatus && matchesPriority && matchesDepartment
    );
  });

  const renderDocumentsTable = () => (
    <div className="overflow-x-auto">
      <div className="mb-4 flex justify-between items-center">
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Search your documents..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-black"></i>
        </div>
        <button
          onClick={() => setShowFilterModal(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-400"
        >
          <i className="fas fa-filter mr-2"></i>
          Filter
        </button>
      </div>

      <table className="min-w-full divide-y divide-gray-200 table-fixed">
        <thead className="bg-orange-500">
          <tr>
            <th className="w-2/6 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Document
            </th>
            <th className="w-2/6 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Details
            </th>
            <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Upload Time
            </th>
            <th className="w-1/12 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Status
            </th>
            <th className="w-1/12 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white border divide-y divide-orange-200">
          {filteredDocuments.map((doc) => (
            <tr key={doc._id}>
              <td className="px-6 py-4 whitespace-normal">
                <div className="flex items-start">
                  <i
                    className={`fas fa-file-${getFileIcon(
                      doc.mimeType
                    )} text-orange-500 mr-3 mt-1 flex-shrink-0`}
                  ></i>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-black truncate group">
                      <span className="group-hover:whitespace-normal group-hover:overflow-visible group-hover:text-clip">
                        {doc.originalName}
                      </span>
                    </div>
                    <div className="text-sm text-black">
                      {formatFileSize(doc.size)}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-normal">
                <div className="min-w-0">
                  <p className="text-sm truncate group">
                    <span className="group-hover:whitespace-normal group-hover:overflow-visible group-hover:text-clip">
                      Uploaded by: {doc.uploadedBy.name}
                    </span>
                  </p>
                  <p className="text-sm text-black truncate group">
                    <span className="group-hover:whitespace-normal group-hover:overflow-visible group-hover:text-clip">
                      {doc.uploadedBy.designation} - {doc.uploadedBy.department}
                    </span>
                  </p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {formatDate(doc.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                    doc.status
                  )}`}
                >
                  {doc.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="flex items-center justify-center space-x-2">
                  <div className="relative group">
                  <button
                    onClick={() => handleStatusChange(doc._id, "approved")}
                    className="text-green-600 text-xl hover:text-green-800"
                    disabled={doc.status === "approved"}
                  >
                    <i className="fas fa-check-circle"></i>
                  </button>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Approve
                  </span>
                </div>
                <div className="relative group">
                  <button
                    onClick={() => handleStatusChange(doc._id, "rejected")}
                    className="text-red-600 text-xl hover:text-red-800"
                    disabled={doc.status === "rejected"}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Reject
                  </span>
                </div>
                {/* <div className="relative group">
                  <button
                    onClick={() => handleDownload(doc)}
                    className="text-black hover:text-red-500"
                  >
                    <i className="fas fa-download"></i>
                  </button>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Download
                  </span>
                  </div> */}
                  <div className="relative hidden">
                    <button
                      onClick={() => toggleDropdown(doc._id)}
                      className="text-black hover:text-gray-900"
                    >
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                    {activeDropdown === doc._id && (
                      <div className="absolute top-8 right-32 transform translate-x-full mt-0 w-50 bg-emerald-400 rounded-md shadow-lg z-50">
                        <div className="py-1">
                          <button
                            onClick={() => handleShare(doc)}
                            className="block w-full text-left px-4 py-2 text-sm text-emerald-100 hover:bg-emerald-900"
                          >
                            <i className="fas fa-share mr-2"></i> Share
                          </button>
                          {/* <button
                            onClick={() => handleAddComment(doc)}
                            className="block w-full text-left px-4 py-2 text-sm text-emerald-100 hover:bg-emerald-900"
                          >
                            <i className="fas fa-comment mr-2"></i> Add Comment
                          </button> */}
                          {/* <button
                            onClick={() => viewHistory(doc)}
                            className="block w-full text-left px-4 py-2 text-sm text-emerald-100 hover:bg-emerald-900"
                          >
                            <i className="fas fa-history mr-2"></i> View History
                          </button> */}
                          <button
                            onClick={() => window.print()}
                            className="block w-full text-left px-4 py-2 text-sm text-emerald-100 hover:bg-emerald-900"
                          >
                            <i className="fas fa-print mr-2"></i> Print
                          </button>
                          {/* <button
                            onClick={() =>
                              handleStatusChange(doc._id, "archived")
                            }
                            className="block w-full text-left px-4 py-2 text-sm text-emerald-100 hover:bg-emerald-900"
                          >
                            <i className="fas fa-archive mr-2"></i> Archive
                          </button> */}
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
    </div>
  );

  const getFileIcon = (mimeType) => {
    if (mimeType.includes("pdf")) return "pdf";
    if (mimeType.includes("word")) return "word";
    if (mimeType.includes("sheet")) return "excel";
    return "alt";
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  // const handleDownload = async (doc) => {
  //   try {
  //     console.log("Downloading document: ", doc._id);

  //     const response = await axios.get(
  //       `http://localhost:5001/api/documents/download/${doc._id}`,
  //       { responseType: "blob" }
  //     );

  //     if (response.status !== 200) {
  //       throw new Error("Failed to fetch file");
  //     }

  //     const fileName = doc.originalName || "downloaded-file";
  //     console.log("Saving file as:", fileName);

  //     saveAs(response.data, fileName);

  //     toast.success("Document downloaded successfully");
  //   } catch (error) {
  //     console.error("Download error:", error.message);
  //     toast.error("Failed to download document");
  //   }
  // };

  const handleShare = (doc) => {
    setSelectedDocument(doc);
    setShowShareModal(true);
  };

  // const handleAddComment = (doc) => {
  //   setSelectedDocument(doc);
  //   setShowCommentModal(true);
  // };

  const submitComment = async () => {
    if (!comment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5001/api/documents/${selectedDocument._id}/comments`,
        {
          text: comment,
        }
      );

      toast.success("Comment added successfully!");
      setComment("");
      setShowCommentModal(false);
      setSelectedDocument(null);
      fetchDocuments(); // Refresh documents
    } catch {
      toast.error("Failed to add comment");
    }
  };

  const submitShare = async () => {
    if (!shareEmail.trim()) {
      toast.error("Please enter an email");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5001/api/documents/${selectedDocument._id}/share`,
        {
          email: shareEmail,
        }
      );

      toast.success("Document shared successfully!");
      setShareEmail("");
      setShowShareModal(false);
      setSelectedDocument(null);
    } catch {
      toast.error("Failed to share document");
    }
  };

  // const viewHistory = async (doc) => {
  //   setSelectedDocument(doc);
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5001/api/documents/${doc._id}/history`
  //     );
  //     setDocumentHistory(response.data);
  //     setShowHistoryModal(true);
  //   } catch {
  //     toast.error("Failed to fetch document history");
  //   }
  // };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderFilterModal = () =>
    showFilterModal && (
      <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white border rounded-lg p-6 w-96">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gradient-animate">
              Filter Documents
            </h3>
            <button onClick={() => setShowFilterModal(false)}>
              <i className="fas fa-times text-black hover:text-red-500"></i>
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-orange-500 mb-1">
                Status
              </label>
              <select
                className="w-full border rounded-lg p-2"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-500 mb-1">
                Priority
              </label>
              <select
                className="w-full border rounded-lg p-2"
                value={filters.priority}
                onChange={(e) =>
                  setFilters({ ...filters, priority: e.target.value })
                }
              >
                <option value="all">All</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-orange-500 mb-1">
                Department
              </label>
              <select
                className="w-full border rounded-lg p-2"
                value={filters.department}
                onChange={(e) =>
                  setFilters({ ...filters, department: e.target.value })
                }
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
                  status: "all",
                  priority: "all",
                  department: "all",
                });
                setShowFilterModal(false);
              }}
              className="px-4 py-2 text-black hover:bg-orange-100 rounded"
            >
              Reset
            </button>
            <button
              onClick={() => setShowFilterModal(false)}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-400"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-4">
          <div className="bg-white border-1px border rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <div className="relative group w-fit">
                <h2 className="text-xl font-semibold text-white text-gradient-animate">
                  Quick Actions
                </h2>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 via-orange-450 to-orange-500 animate-gradient transition-all duration-300 group-hover:w-full"></span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-white text-black border rounded-lg p-4 flex flex-col items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                <i className="fas fa-upload mb-2 text-xl"></i>
                <span className="">Upload Document</span>
              </button>

              <button
                onClick={() => navigate("/tracking")}
                className="bg-white text-black border rounded-lg p-4 flex flex-col items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                <i className="fas fa-chart-line mb-2 text-xl"></i>
                <span className="">Track Progress</span>
              </button>

              <button
                onClick={() => navigate("/reports")}
                className="bg-white text-black border rounded-lg p-4 flex flex-col items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                <i className="fas fa-file-alt mb-2 text-xl"></i>
                <span className="">Generate Report</span>
              </button>

              <button
                onClick={() => setShowFolderModal(true)}
                className="bg-white hidden text-black border rounded-lg p-4 flex flex-col items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-400"
              >
                <i className="fas fa-folder-plus mb-2 text-xl"></i>
                <span className="">Create Folder</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border-1px border border-white rounded-lg p-6 mb-6 w-full">
              <h3 className="text-lg font-medium text-black mb-4">
                <div className="relative group w-fit">
                  <h2 className="text-xl font-semibold text-white text-gradient-animate">
                    Document Statistics
                  </h2>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 via-orange-450 to-orange-500 animate-gradient transition-all duration-300 group-hover:w-full"></span>
                </div>{" "}
                <Document />
              </h3>
            </div>

            <div className="bg-white border-1px border border-white rounded-lg p-6 mb-6 w-full">
              <h3 className="text-lg font-medium text-white mb-4">
                <div className="relative group w-fit">
                  <h2 className="text-xl font-semibold text-white text-gradient-animate">
                    Recent Activity
                  </h2>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 via-orange-450 to-orange-500 animate-gradient transition-all duration-300 group-hover:w-full"></span>
                  
                </div>
                <RecentActivity />
              </h3>
            </div>
          </div>

          <div className="bg-white border-1px rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-6">
              <div className="relative group w-fit">
                <h2 className="text-xl font-semibold text-white text-gradient-animate">
                  Recent Documents
                </h2>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 via-orange-450 to-orange-500 animate-gradient transition-all duration-300 group-hover:w-full"></span>
              </div>{" "}
            </h2>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <i className="fas fa-spinner fa-spin text-2xl text-black"></i>
              </div>
            ) : documents.length === 0 ? (
              <p className="text-center text-black py-8">
                No documents uploaded yet
              </p>
            ) : (
              renderDocumentsTable()
            )}
          </div>
        </div>
      </div>

      <DocumentUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUploadSuccess={handleUploadSuccess}
      />
      {renderFilterModal()}

      {/* Comment Modal */}
      {showCommentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-medium mb-4">Add Comment</h3>
            <textarea
              className="w-full border rounded-lg p-2 mb-4"
              rows="4"
              placeholder="Enter your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCommentModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
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
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-medium mb-4">Share Document</h3>
            <input
              type="email"
              className="w-full border rounded-lg p-2 mb-4"
              placeholder="Enter email address"
              value={shareEmail}
              onChange={(e) => setShareEmail(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-medium mb-4">Document History</h3>
            <div className="space-y-4">
              {documentHistory.map((history, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <div>
                    <span className="font-medium">{history.action}</span>
                    <span className="text-gray-600"> by {history.user}</span>
                  </div>
                  <span className="text-gray-500">
                    {formatDate(history.date)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
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

      {showFolderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <FolderForm
            onFolderCreated={() => {
              fetchDocuments();
            }}
            onClose={() => setShowFolderModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
