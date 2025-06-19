const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  department: {
    type: String,
    required: true
  },
  access: {
    type: String,
    enum: ['private', 'department', 'public'],
    default: 'private'
  },
  createdBy: {
    name: {
      type: String,
      required: true
    },
    designation: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    }
  },
  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Folder', folderSchema); 