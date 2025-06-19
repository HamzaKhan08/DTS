import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';

const getFileIcon = (mimeType) => {
  if (mimeType.includes('pdf')) return 'pdf';
  if (mimeType.includes('word')) return 'word';
  if (mimeType.includes('sheet')) return 'excel';
  return 'alt';
};

const Report = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [reportFormat, setReportFormat] = useState('pdf');
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/documents');
      setDocuments(response.data);
    } catch {
      toast.error('Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentSelect = (docId) => {
    setSelectedDocs(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleSelectAll = () => {
    setSelectedDocs(
      selectedDocs.length === documents.length
        ? []
        : documents.map(doc => doc._id)
    );
  };

  const generateReport = async () => {
    if (selectedDocs.length === 0) {
      toast.warning('Please select at least one document');
      return;
    }

    setGenerating(true);
    try {
      const response = await axios.post(
        'http://localhost:5001/api/documents/generate-report',
        {
          documentIds: selectedDocs,
          format: reportFormat
        },
        { responseType: 'blob' }
      );

      const fileName = `report-${new Date().toISOString().split('T')[0]}.${reportFormat}`;
      saveAs(new Blob([response.data]), fileName);
      toast.success('Report generated successfully');
    } catch (error) {
      toast.error('Failed to generate report');
      console.error('Error:', error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className='relative group w-fit'>
          <h1 className="text-2xl font-semibold text-gradient-animate">Generate Report</h1>
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 via-orange-450 to-orange-400 animate-gradient transition-all duration-300 group-hover:w-full"></span>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={reportFormat}
              onChange={(e) => setReportFormat(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="pdf">PDF</option>
              <option value="doc">DOC</option>
              <option value="xls">XLS</option>
            </select>
            <button
              onClick={generateReport}
              disabled={generating || selectedDocs.length === 0}
              className={`px-4 py-2 rounded-lg text-white ${
                generating || selectedDocs.length === 0
                  ? 'bg-orange-400 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600 border-dotted border'
              }`}
            >
              {generating ? (
                <><i className="fas fa-spinner fa-spin mr-2"></i>Generating...</>
              ) : (
                <><i className="fas fa-file-export mr-2"></i>Generate Report</>
              )}
            </button>
          </div>
        </div>
        <hr className='my-4' />
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <i className="fas fa-spinner fa-spin text-2xl text-orange-500"></i>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedDocs.length === documents.length}
                  onChange={handleSelectAll}
                  className="rounded border text-orange-400 focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-orange-500">Select All</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <div
                  key={doc._id}
                  className={`border bg-orange-100 rounded-lg p-4 ${
                    selectedDocs.includes(doc._id)
                      ? 'border'
                      : 'border border-dotted'
                  }`}
                >
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedDocs.includes(doc._id)}
                      onChange={() => handleDocumentSelect(doc._id)}
                      className="mt-1 rounded border text-orange-400 focus:ring-orange-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center">
                        <i className={`fas fa-file-${getFileIcon(doc.mimeType)} text-orange-500 mr-2`}></i>
                        <span className="font-medium text-orange-500">{doc.originalName}</span>
                      </div>
                      <div className="text-sm text-black mt-1">
                        <p>Uploaded by: {doc.uploadedBy.name}</p>
                        <p>Status: {doc.status}</p>
                        <p>Date: {new Date(doc.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Report;
