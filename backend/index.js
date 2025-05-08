const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const AuthRouter = require('./Routes/AuthRouter');
const connectDB = require('./Models/db');
const Bookappoint = require('./Routes/Bookappoint');
const paypal = require('./Controllers/Paypal');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

// Database Connection
if (process.env.NODE_ENV !== 'production') {
  connectDB();
}

// Middleware
app.use(bodyParser.json());

app.use(cors({
  origin: [
    process.env.FRONTEND_URL_DEV,
    'http://localhost:3000'
  ],
  credentials: true
}));


app.get('/mongo-debug', async (req, res) => {
  try {
    const conn = await connectDB();
    
    if (!conn || !conn.db) {
      throw new Error('Connection established but DB reference missing');
    }

    // Test actual database operation
    const pingResult = await conn.db.command({ ping: 1 });
    const serverInfo = await conn.db.admin().serverStatus();

    res.json({
      connected: true,
      ping: pingResult,
      replicaSet: conn.client.topology.s.description.setName,
      primary: conn.client.topology.s.description.primary,
      version: serverInfo.version,
      time: new Date()
    });
  } catch (err) {
    res.status(500).json({
      connected: false,
      error: err.message,
      details: {
        name: err.name,
        code: err.code,
      },
      time: new Date()
    });
  }
});

app.get('/', (req, res) => {
  res.json({
    status: 'API is working',
    message: 'Welcome to the Lab System API'
  });
});

// Routes
app.use('/api/auth', AuthRouter);
app.use('/api/book', Bookappoint);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

if (require.main === module) {
  const PORT = process.env.PORT || 8100;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export app for Vercel
module.exports = app;