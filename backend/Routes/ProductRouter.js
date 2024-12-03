// Testing Purpose


const express = require('express');
const ensureAuthenticated = require('../Midlewares/Auth'); 

const router = express.Router();

router.get('/', ensureAuthenticated, (req, res) => {
    res.status(200).json([
        {
            name: "mobile",
            price: 194060,
        },
        {
            name: "tv",
            price: 7645
        }
    ]);
});

module.exports = router;
