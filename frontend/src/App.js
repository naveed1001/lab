import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { AuthProvider } from './pages/AuthContext';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Login from './pages/Login';
import ResetPasword from './pages/ResetPasword';
import SetNewPassword from './pages/SetNewPassword';
import AdminDashboard from './pages/AdminDashboard';
// import Admin from './pages/AdminUser';
import CreateAdmin from './pages/CreateNewAdmin';
import CreateLabTestForm from './pages/Labs';
import LabTestList from './pages/LabsList';
// import LabTestUpdateForm from './pages/UpdateLabs';

function App() {
  
  return (
    <AuthProvider>
    <div>
       <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/password-reset" element={<ResetPasword />} />
        <Route path="/reset-password" element={<SetNewPassword/>} />
        <Route path="/admindashboard" element={<AdminDashboard/>} />
        {/* <Route path="/admin" element={<Admin/>} /> */}
      
        <Route path="/newadmin" element={<CreateAdmin isEditMode={false} />} />
        <Route path="/newadmin/:id" element={<CreateAdmin isEditMode={true} />} />

        <Route path="/labs-create" element={<CreateLabTestForm/>} />
        <Route path="/labs-list" element={<LabTestList/>} />
        {/* <Route path="/labs-update/:id" element={<LabTestUpdateForm />} /> */}

       
      </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;
