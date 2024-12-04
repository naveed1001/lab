const router = require('express').Router();
const { signup, login } = require('../Controlers/AuthControler');
const { signupvalidation, loginvalidation } = require('../Midlewares/AuthValidation');
const { requestReset, resetPassword } = require('../Controlers/restpassControler');

// Signup Route
router.post('/signup', signupvalidation, signup);

// Login Route
router.post('/login', loginvalidation, login);

router.post('/request-reset', requestReset);
router.post('/reset-password', resetPassword);

module.exports = router;
