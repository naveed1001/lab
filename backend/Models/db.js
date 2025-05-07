const mongoose = require('mongoose');

const connectDB = async () => {
  const options = {
    serverSelectionTimeoutMS: 10000,  // 10 seconds
    socketTimeoutMS: 45000,          // 45 seconds
    connectTimeoutMS: 30000,         // 30 seconds
    retryWrites: true,
    retryReads: true,
    replicaSet: 'atlas-c4v1aq-shard-0',
    readPreference: 'primaryPreferred',
    srvServiceName: 'mongodb',
    tls: true,
    appName: "AuthDB",
    maxPoolSize: 10,
    minPoolSize: 1,
    // Removed unsupported 'dns' option
    // Added these for better replica set handling:
    heartbeatFrequencyMS: 10000,
    localThresholdMS: 15
  };

  try {
    await mongoose.connect(process.env.MONGO_URI, options);
    console.log('✅ MongoDB connected to:', mongoose.connection.host);
    return mongoose.connection;
  } catch (err) {
    console.error('❌ Connection failed:', {
      name: err.name,
      message: err.message,
      reason: err.reason?.message,
      replicaSet: err.reason?.setName,
      servers: Object.keys(err.reason?.servers || {})
    });
    throw err; // Rethrow to handle in calling function
  }
};

module.exports = connectDB;