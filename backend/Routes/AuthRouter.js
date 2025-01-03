// routes.js (or wherever you define your routes)
const router = require('express').Router();
const { signup, login } = require('../Controlers/AuthControler');
const { signupvalidation, loginvalidation } = require('../Midlewares/AuthValidation');
const { requestReset, resetPassword } = require('../Controlers/restpassControler');
const { getAllUsers, deleteUser, getCurrentUser, updateUser, getUserById} = require('../Controlers/UserController');
const {  verifyToken } = require('../Midlewares/RoleMidleware');
const { authorize } = require('../Midlewares/RoleMidleware');
const { authenticateAdmin } = require('../Midlewares/NewMidleware');
const {createLabTest,getAllLabTests,updateLabTest,deleteLabTest} = require('../Controlers/LabsTest')
const {exportCSV,upload,importCSV} = require('../Controlers/ExportData')
// Signup Route
router.post('/signup',  signupvalidation, signup);

// Login Route
router.post('/login', loginvalidation, login);

// Route for admin to register users or admins
router.post('/register-admin', authenticateAdmin, signup);

// Password Reset Routes
router.post('/request-reset', requestReset);
router.post('/reset-password', resetPassword);



// Admin-only routes
router.get('/users', verifyToken, authorize(['admin', 'user']), getAllUsers); 

router.delete('/users/:id',verifyToken, authorize(['admin']), deleteUser);  

router.get('/user', verifyToken, authorize(['admin', 'user']), getCurrentUser);

router.put('/update/:id', verifyToken, authorize(['admin']), updateUser);

router.get('/user/:id',verifyToken,authorize(['admin']), getUserById);

router.post("/lab-tests",verifyToken,authorize(['admin']), createLabTest);
router.get("/lab-tests",verifyToken,authorize(['admin']), getAllLabTests);

router.put("/lab-tests/:id",verifyToken,authorize(['admin']),updateLabTest );
router.delete("/lab-tests/:id",verifyToken,authorize(['admin']), deleteLabTest);


router.get('/export/csv', exportCSV);
router.post('/import/csv', upload.single('file'), importCSV);



module.exports = router;
