const express = require('express');
const router = express.Router();
const Folder = require('../models/Folder');

// Create folder
router.post('/', async (req, res) => {
  try {
    const { name, description, department, access } = req.body;

    // Add validation
    if (!name || !department) {
      return res.status(400).json({ message: 'Name and department are required' });
    }

    const folder = new Folder({
      name,
      description,
      department,
      access,
      createdBy: {
        name: 'John Doe', // Replace with actual user data from auth
        designation: 'Manager',
        department: department
      }
    });

    const savedFolder = await folder.save();
    res.status(201).json(savedFolder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating folder', error: error.message });
  }
});

// Get all folders
router.get('/', async (req, res) => {
  try {
    const folders = await Folder.find().sort({ createdAt: -1 });
    res.json(folders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching folders', error: error.message });
  }
});

// Get folder by ID
router.get('/:id', async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id).populate('documents');
    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }
    res.json(folder);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching folder', error: error.message });
  }
});

// Update folder
router.patch('/:id', async (req, res) => {
  try {
    const folder = await Folder.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }
    res.json(folder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating folder', error: error.message });
  }
});

// Delete folder
router.delete('/:id', async (req, res) => {
  try {
    const folder = await Folder.findByIdAndDelete(req.params.id);
    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }
    res.json({ message: 'Folder deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting folder', error: error.message });
  }
});

module.exports = router; 