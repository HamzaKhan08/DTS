const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Document = require('../models/Document');
const { getFileFromStorage } = require('../utils/storage');
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');
const officegen = require('officegen');
const fs = require('fs');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Save files in uploads/
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Get all documents
router.get('/', async (req, res) => {
  try {
    const documents = await Document.find().sort({ createdAt: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Download document
router.get('/download/:id', async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    console.log(`Document found: ${document.fileName}`);

    if (!document.fileName) {
      return res.status(500).json({ message: 'File name is missing in database' });
    }

    const file = await getFileFromStorage(document.fileName);

    res.setHeader('Content-Type', document.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${document.originalName}"`);

    return res.send(file);
  } catch (error) {
    console.error('Download error:', error.message);
    return res.status(500).json({ message: 'Failed to download file' });
  }
});

// Upload route
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const {
      uploaderName,
      designation,
      department,
      priority,
      description,
      tags
    } = req.body;

    const document = new Document({
      name: req.file.filename,
      originalName: req.file.originalname,
      fileName: req.file.path,
      mimeType: req.file.mimetype,
      size: req.file.size,
      uploadedBy: {
        name: uploaderName,
        designation,
        department
      },
      priority,
      description,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    });

    const savedDocument = await document.save();
    res.status(201).json(savedDocument);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update document status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const document = await Document.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(document);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add this route to your existing documentRoutes.js
router.post('/generate-report', async (req, res) => {
  try {
    const { documentIds, format } = req.body;
    const documents = await Document.find({ _id: { $in: documentIds } })
      .populate('uploadedBy', 'name designation department');

    if (documents.length === 0) {
      return res.status(404).json({ message: 'No documents found' });
    }

    switch (format) {
      case 'pdf':
        await generatePDFReport(documents, res);
        break;
      case 'doc':
        await generateDOCReport(documents, res);
        break;
      case 'xls':
        await generateXLSReport(documents, res);
        break;
      default:
        res.status(400).json({ message: 'Unsupported format' });
    }
  } catch (error) {
    console.error('Report generation error:', error);
    res.status(500).json({ message: 'Error generating report' });
  }
});

const generatePDFReport = async (documents, res) => {
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
  doc.pipe(res);

  doc.fontSize(20).text('Document Report', { align: 'center' });
  doc.moveDown();

  documents.forEach((document, index) => {
    doc.fontSize(14).text(`Document ${index + 1}: ${document.originalName}`);
    doc.fontSize(12)
      .text(`Uploaded by: ${document.uploadedBy.name}`)
      .text(`Department: ${document.uploadedBy.department}`)
      .text(`Status: ${document.status}`)
      .text(`Upload Date: ${new Date(document.createdAt).toLocaleDateString()}`);
    doc.moveDown();
  });

  doc.end();
};

const generateXLSReport = async (documents, res) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Documents');

  worksheet.columns = [
    { header: 'Document Name', key: 'name', width: 30 },
    { header: 'Uploaded By', key: 'uploader', width: 20 },
    { header: 'Department', key: 'department', width: 20 },
    { header: 'Status', key: 'status', width: 15 },
    { header: 'Upload Date', key: 'date', width: 15 }
  ];

  documents.forEach(doc => {
    worksheet.addRow({
      name: doc.originalName,
      uploader: doc.uploadedBy.name,
      department: doc.uploadedBy.department,
      status: doc.status,
      date: new Date(doc.createdAt).toLocaleDateString()
    });
  });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');
  await workbook.xlsx.write(res);
};

const generateDOCReport = async (documents, res) => {
  const docx = officegen('docx');
  
  docx.on('error', (err) => {
    console.error(err);
    res.status(500).send('Error generating DOC');
  });

  const p = docx.createP();
  p.addText('Document Report', { bold: true, font_size: 16 });

  documents.forEach((doc) => {
    const p = docx.createP();
    p.addLineBreak();
    p.addText(`Document: ${doc.originalName}`, { bold: true });
    p.addLineBreak();
    p.addText(`Uploaded by: ${doc.uploadedBy.name}`);
    p.addLineBreak();
    p.addText(`Department: ${doc.uploadedBy.department}`);
    p.addLineBreak();
    p.addText(`Status: ${doc.status}`);
    p.addLineBreak();
    p.addText(`Upload Date: ${new Date(doc.createdAt).toLocaleDateString()}`);
  });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.setHeader('Content-Disposition', 'attachment; filename=report.docx');
  docx.generate(res);
};

module.exports = router;