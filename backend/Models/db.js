// db.js
const mongoose = require('mongoose');
let connection = null;

const connectDB = async () => {
  if (connection && mongoose.connection.readyState === 1) {
    return connection;
  }

  const options = {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 30000,
    retryWrites: true,
    retryReads: true,
    replicaSet: 'atlas-c4v1aq-shard-0',
    readPreference: 'primaryPreferred',
    tls: true,
    appName: "AuthDB",
    maxPoolSize: 10,
    minPoolSize: 1
  };

  try {
    await mongoose.connect(process.env.MONGO_URI, options);
    connection = mongoose.connection;
    
    connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      connection = null;
    });

    console.log('✅ MongoDB connected to:', connection.host);
    return connection;
  } catch (err) {
    console.error('❌ Connection failed:', {
      name: err.name,
      message: err.message,
      stack: err.stack
    });
    throw err;
  }
};

module.exports = connectDB;