// routes.js (or wherever you define your routes)
const router = require('express').Router();
const { signup, login } = require('../Controlers/AuthControler');
const { signupvalidation, loginvalidation } = require('../Midlewares/AuthValidation');
const { requestReset, resetPassword } = require('../Controlers/restpassControler');
const { getAllUsers, deleteUser, getCurrentUser, updateUser, getUserById,getAllAdmins} = require('../Controlers/UserController');
const {  verifyToken } = require('../Midlewares/RoleMidleware');
const { authorize } = require('../Midlewares/RoleMidleware');
const { authenticateAdmin } = require('../Midlewares/NewMidleware');
const {createLabTest,getAllLabTests,updateLabTest,deleteLabTest,getLabsById,labsCurrentUser } = require('../Controlers/LabsTest')
const {exportCSV,upload,importCSV} = require('../Controlers/ExportData')
const {CreatePatientProfile,getAll, UpdatePatient,deletePatient, getPatientById, PatientCurrentUser } = require('../Controlers/Patient')

const {saveRecords} = require('../Controlers/Saverecord');


const {createnewLab,
    getnewAllLabs,
    getnewLabById,
    updatenewLabById,
    deletenewLabById,} = require('../Controlers/CreateNewLab');
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
router.get('/admins',  getAllAdmins); 

router.delete('/users/:id',verifyToken, authorize(['admin']), deleteUser);  

router.get('/user', verifyToken, authorize(['admin', 'user']), getCurrentUser);

router.put('/update/:id', verifyToken, authorize(['admin']), updateUser);

router.get('/user/:id',verifyToken,authorize(['admin']), getUserById);

// Labs
router.post("/lab-tests",verifyToken,authorize(['admin']), createLabTest);
router.get("/lab-tests", getAllLabTests);
router.put("/lab-tests/:id",verifyToken,authorize(['admin']),updateLabTest );
router.delete("/lab-tests/:id",verifyToken,authorize(['admin']), deleteLabTest);
router.get("/labs",verifyToken,authorize(['admin']), getLabsById );
router.get("/current-labs",verifyToken,authorize(['admin']), labsCurrentUser);


router.get('/export/csv', exportCSV);
router.post('/import/csv', upload.single('file'), importCSV);

// Patient
router.post('/patient-create', CreatePatientProfile);
router.get('/patient-all', getAll);
router.put('/patient-update/:id', UpdatePatient);
router.delete('/patient-delete/:id',deletePatient );
router.get('/patient/:id', getPatientById);
router.get('/patient-current', verifyToken,authorize(['admin']), PatientCurrentUser);

router.post('/save-records',saveRecords);


router.post('/create-new-lab', createnewLab);
router.get('/newlab-all', getnewAllLabs);
router.put('/newlab-update/:id', updatenewLabById);
router.delete('/newlab-delete/:id',deletenewLabById );
router.get('/newlab/:id',  getnewLabById);


module.exports = router;
