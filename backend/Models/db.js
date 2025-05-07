const mongoose = require('mongoose');

const connectDB = async () => {
  console.log("Attempting MongoDB connection with URI:", 
    process.env.MONGO_URI.replace(/:[^@]+@/, ':*****@')); // Logs masked URI

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      maxPoolSize: 10
    });
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection FAILED:", {
      error: err.message,
      stack: err.stack,
      fullError: JSON.stringify(err, null, 2)
    });
    process.exit(1);
  }
};

module.exports = connectDB;