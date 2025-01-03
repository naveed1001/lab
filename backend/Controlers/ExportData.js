const User = require('../Models/LabTestModel');
const { Parser } = require('json2csv');
const multer = require('multer');
const csv = require('csvtojson');
const path = require('path');
const fs = require('fs');
// path is used to handle and manipulate file paths,
//  while fs is used to interact with the file system (e.g., reading and writing files).

const uploadPath = 'D:/Download-Import';
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const exportCSV = async (req, res) => {
  try {
    const usersData = await User.find({});

    const users = usersData.map((user) => {
      const { testName, testCode, price, status } = user;
      return { testName, testCode, price, status };
    });

    const csvFields = ['testName', 'testCode', 'price', 'status'];
    const csvParser = new Parser({ fields: csvFields });
    const csvData = csvParser.parse(users);

    res.setHeader('Content-Type', 'text/csv');

    //  the browser to download the content as
    //  a file named usersData.csv.

    res.setHeader('Content-Disposition', 'attachment;filename=usersData.csv');
    res.status(200).end(csvData);
  } catch (error) {
    res.status(500).json({ message: 'Error exporting CSV', error });
  }
};

const importCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    console.log('Uploaded file path:', req.file.path);

    const jsonArray = await csv().fromFile(req.file.path);
    console.log('Parsed JSON:', jsonArray);

    const savedRecords = [];
    for (const record of jsonArray) {
      const { testName, testCode, price, status } = record;

      if (!testName || !testCode || !price || !status) {
        console.log('Missing or invalid data in record:', record);
        continue;
      }

      const newLabTest = new User({
        testName,
        testCode,
        price,
        status,
      });

      try {
        const saved = await newLabTest.save();
        savedRecords.push(saved);
      } catch (dbError) {
        console.error('Error saving record to database:', dbError);
        continue;
      }
    }

    res.status(200).json({
      message: 'Data imported successfully',
      records: savedRecords.length,
    });
  } catch (error) {
    console.error('Error importing CSV:', error);
    res.status(500).json({ message: 'Error importing CSV', error });
  }
};

module.exports = { exportCSV, upload, importCSV };
