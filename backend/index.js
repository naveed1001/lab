const express = require('express');
const connectDB = require('./Models/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const AuthRouter = require('./Routes/AuthRouter');
const Bookappoint = require('./Routes/Bookappoint');
const paypal = require('./Controlers/Paypal');

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
    'http://localhost:3000' // For local development
  ],
  credentials: true
}));

// Routes
app.get('/ping', (req, res) => res.send('pong'));
app.use('/auth', AuthRouter);
app.use('/book', Bookappoint);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Export for Vercel (remove app.listen)
module.exports = app;