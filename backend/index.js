const express = require('express');
const connectDB = require('./Models/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter')

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;
// Connect to the Database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/ping', (req, res) => res.send('pong'));
app.use('/auth', AuthRouter);

// Testing Purpose
app.use('/products', ProductRouter);


// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
