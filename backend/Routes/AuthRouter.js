const router = require('express').Router();
const { signup, login } = require('../Controlers/AuthControler');
const { signupvalidation, loginvalidation } = require('../Midlewares/AuthValidation');

// Signup Route
router.post('/signup', signupvalidation, signup);

// Login Route
router.post('/login', loginvalidation, login);

module.exports = router;
