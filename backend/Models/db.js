const mongoose = require('mongoose');

const connectDB = async () => {
  const options = {
    serverSelectionTimeoutMS: 30000,  // 30 seconds
    socketTimeoutMS: 45000,          // 45 seconds
    connectTimeoutMS: 30000,         // 30 seconds
    retryWrites: true,
    retryReads: true,
    replicaSet: 'atlas-c4v1aq-shard-0',  // From your error logs
    readPreference: 'primaryPreferred',
    tls: true,  // Use 'tls' instead of 'ssl' for newer MongoDB drivers
    appName: "AuthDB",
    // Remove sslValidate as it's not supported in newer drivers
  };

  try {
    await mongoose.connect(process.env.MONGO_URI, options);
    console.log('✅ MongoDB connected to:', mongoose.connection.host);
  } catch (err) {
    console.error('❌ MongoDB connection failed:', {
      error: err.message,
      fullError: JSON.stringify(err, null, 2),
      replicaSet: err.reason?.setName,
      servers: Object.keys(err.reason?.servers || {})
    });
    process.exit(1);
  }
};

module.exports = connectDB;