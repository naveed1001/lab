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
import CreateAdmin from './pages/CreateNewAdmin';
import CreateLabTestForm from './pages/Labs';
import LabTestList from './pages/LabsList';
import ImportPage from './pages/Import';
import ExportPage from './pages/Export';
import FileUploadModal from './pages/FileUpload';
import GetAdmins from './pages/GetAdmins';
import Sidebar from './pages/Sidebar';
import GetAllPatient from './pages/patient/GetAllPatient';
import UpdatePatientProfile from './pages/patient/UpdatePatient';
import CreatePatientProfile from './pages/patient/CreatePatient';
import CreateOrderForm from './pages/AllLabs';
import ManageUserRoles from './pages/RoleManage';
import CreateNewLab from './pages/CreateNewLab';
import AllNewLab from './pages/AllNewLab';
import UpdateNewLab from './pages/UpdateAllNewLab';
import BookPoint from './pages/PaymentGetway/BookPoint';
import PaymentGateway from './pages/PaymentGetway/Payment';
import PaymentSuccess from './pages/PaymentGetway/PaymentSuccess';
import Checkout from './pages/PaymentGetway/Checkout';
import ProductList from './Cart/Product';
import Cart from './Cart/Cart';

function App() {

  return (
    <AuthProvider>
      <div>

        <ToastContainer />
        {/* <ProductList />
        <Cart /> */}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/password-reset" element={<ResetPasword />} />
          <Route path="/reset-password" element={<SetNewPassword />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />

          <Route path="/newadmin" element={<CreateAdmin isEditMode={false} />} />
          <Route path="/newadmin/:id" element={<CreateAdmin isEditMode={true} />} />

          <Route path="/labs-create" element={<CreateLabTestForm />} />
          <Route path="/labs-list" element={<LabTestList />} />

          <Route path="/import" element={<ImportPage />} />
          <Route path="/export" element={<ExportPage />} />
          <Route path="/fileupload" element={<FileUploadModal />} />
          <Route path="/admins" element={<GetAdmins />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/create-patient" element={<CreatePatientProfile isEditMode={false} />} />
          <Route path="/create-patient/:id" element={<CreatePatientProfile isEditMode={true} />} />

          <Route path="/update-patient/:id" element={<UpdatePatientProfile />} />
          <Route path="/all-patient" element={<GetAllPatient />} />
          <Route path="/order" element={<CreateOrderForm />} />
          <Route path="/rolemanage" element={<ManageUserRoles />} />
          <Route path="/create-new-lab" element={<CreateNewLab />} />
          <Route path="/all-new-lab" element={<AllNewLab />} />
          <Route path="/update-new-lab/:id" element={<UpdateNewLab />} />
          <Route path="/book" element={<BookPoint />} />
          <Route path="/payment" element={<PaymentGateway />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />

          <Route path="/checkout" element={<Checkout />} />
          <Route path="/productlist" element={<ProductList />} />

          <Route path="/cart" element={<Cart />} />
          
          
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
