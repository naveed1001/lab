const User = require('../Models/LabTestModel');
const { Parser } = require('json2csv');
const multer = require('multer');
const csv = require('csvtojson');

// In backend/Controllers/ExportData.js
const fs = require('fs');
const path = require('path');

// For Vercel deployment
const downloadDir = process.env.VERCEL ? '/tmp/Download-Import' : 'F:/Download-Import';

// Create directory if it doesn't exist
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
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

      // Check if the record with the same testCode already exists
      let existingRecord = null;
      try {
        existingRecord = await User.findOne({ testCode });
      } catch (findError) {
        console.error('Error finding record:', findError);
        continue;
      }

      if (existingRecord) {
        // Update the record if data has changed
        if (
          existingRecord.testName !== testName ||
          existingRecord.price !== price ||
          existingRecord.status !== status
        ) {
          existingRecord.testName = testName;
          existingRecord.price = price;
          existingRecord.status = status;

          try {
            const updated = await existingRecord.save();
            savedRecords.push(updated);
            console.log(`Updated record with testCode: ${testCode}`);
          } catch (dbError) {
            console.error('Error updating record in database:', dbError);
            continue;
          }
        } else {
          console.log(`No changes detected for testCode: ${testCode}, skipping update.`);
        }
      } else {
        // Create a new record
        const newLabTest = new User({
          testName,
          testCode,
          price,
          status,
        });

        try {
          const saved = await newLabTest.save();
          savedRecords.push(saved);
          console.log(`Saved new record with testCode: ${testCode}`);
        } catch (dbError) {
          if (dbError.code === 11000) { 
            console.error(`Duplicate testCode detected: ${testCode}, skipping.`);
          } else {
            console.error('Error saving new record to database:', dbError);
          }
          continue;
        }
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
