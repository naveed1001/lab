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
connectDB().catch(err => {
  console.error('Database connection failed:', err);
  process.exit(1);
});

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
    const connection = await connectDB();
    
    // Test actual database command
    const pingResult = await connection.db.command({ ping: 1 });
    
    res.json({
      connected: true,
      ping: pingResult,
      replicaSet: connection.client.topology.s.description.setName,
      primary: connection.client.topology.s.description.primary,
      hosts: Array.from(connection.client.topology.s.description.servers.keys()),
      time: new Date()
    });
  } catch (err) {
    res.status(500).json({
      connected: false,
      error: err.message,
      details: {
        name: err.name,
        code: err.code,
        replicaSet: err.reason?.setName
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

// For local development
  const PORT = process.env.PORT || 8100;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

// Export for Vercel (remove app.listen)
module.exports = app;