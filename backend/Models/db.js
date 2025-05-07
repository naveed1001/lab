// In your db.js or connection file
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,  // 5 seconds timeout
      socketTimeoutMS: 45000          // 45 seconds socket timeout
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;