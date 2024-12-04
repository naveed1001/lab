import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { AuthProvider } from './pages/AuthContext';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Login from './pages/Login';
import ResetPasword from './pages/ResetPasword';
import ForgetPassword from './pages/ForgetPassword';

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
        <Route path="/forgot-password/:id/:token" element={<ForgetPassword />} />


      </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;
