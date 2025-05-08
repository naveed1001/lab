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
  connectDB();

// Middleware
app.use(bodyParser.json());

app.use(cors({
  origin: [
    process.env.FRONTEND_URL_DEV,
    'http://localhost:3000'
  ],
  credentials: true
}));


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