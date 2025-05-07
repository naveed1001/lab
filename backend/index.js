const express = require('express');
const connectDB = require('./Models/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const AuthRouter = require('./Routes/AuthRouter');
const Bookappoint = require('./Routes/Bookappoint');
const paypal = require('./Controllers/Paypal');

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

app.use(cors({
  origin: [
    process.env.FRONTEND_URL_DEV,
    'http://localhost:3000' // For local development
  ],
  credentials: true
}));

app.get('/mongo-status', async (req, res) => {
  try {
    const status = {
      connected: mongoose.connection.readyState === 1,
      host: mongoose.connection.host,
      replicaSet: mongoose.connection.client?.topology?.description?.setName,
      servers: Array.from(mongoose.connection.client?.topology?.description?.servers.keys() || []),
      time: new Date()
    };
    res.json(status);
  } catch (err) {
    res.status(500).json({ error: err.message });
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