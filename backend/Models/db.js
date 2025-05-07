const mongoose = require('mongoose');

const connectDB = async () => {
  const options = {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 30000,
    retryWrites: true,
    retryReads: true,
    replicaSet: 'atlas-c4v1aq-shard-0',
    readPreference: 'primaryPreferred',
    srvServiceName: 'mongodb',
    directConnection: false,
    tls: true,
    appName: "AuthDB",
    heartbeatFrequencyMS: 10000,
    maxPoolSize: 10,
    minPoolSize: 1,
    dns: {
      servers: ['8.8.8.8', '1.1.1.1'], // Google and Cloudflare DNS
      timeout: 5000
    }
  };

  try {
    await mongoose.connect(process.env.MONGO_URI, options);
    console.log('✅ MongoDB connected to:', mongoose.connection.host);
  } catch (err) {
    console.error('❌ Connection failed:', {
      error: err.message,
      replicaSet: err.reason?.setName,
      servers: Object.keys(err.reason?.servers || {})
    });
    process.exit(1);
  }
};

module.exports = connectDB;