const fs = require('fs').promises;
const path = require('path');

const getFileFromStorage = async (fileName) => {
  try {
    const filePath = path.join(__dirname, '../uploads', fileName);
    console.log(`Trying to read file from: ${filePath}`);

    const file = await fs.readFile(filePath);
    return file;
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    throw new Error(`Failed to retrieve file from storage: ${error.message}`);
  }
};

module.exports = {
  getFileFromStorage
};
