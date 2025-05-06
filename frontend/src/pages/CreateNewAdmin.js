import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';
const baseUrl = process.env.REACT_APP_API_URL_DEV;


const CreateAdmin = ({ isEditMode = false }) => {
  const { id } = useParams(); 
  const location = useLocation();
  const existingUserData = location.state?.userData || {}; 

  const [formData, setFormData] = useState(
    isEditMode
      ? { ...existingUserData }
      : {
        firstName: '',
        lastName: '',
        practiceName: '',
        phone: '',
        streetAddress: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        username: 'superadmin',
        assignRoles: '',
        status: 'Active',
        password: '',
        confirmPassword: '',
      }
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = baseUrl || 'http://localhost:8100';  

  useEffect(() => {
    if (isEditMode && id) {
      setLoading(true);
      axios
        .get(`${API_URL}/auth/user/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        })
        .then((response) => {
          console.log(response.data); 
          setFormData(response.data); 
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          toast.error('Failed to fetch user data.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isEditMode, id, API_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEditMode) {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }
      if (!formData.assignRoles.trim()) {
        toast.error('Role assignment is required.');
        return;
      }
    }

    try {
      setLoading(true);  
      const url = isEditMode
        ? `${API_URL}/auth/update/${id}`
        : `${API_URL}/auth/register-admin`;

      const method = isEditMode ? 'put' : 'post';

      await axios({
        method,
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      toast.success(isEditMode ? 'User updated successfully!' : 'Admin created successfully!');
      setTimeout(() => navigate('/admindashboard'), 1000);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);  
    }
  };
console.log("loading",loading);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar className="fixed top-0 left-0 h-screen w-64 bg-white shadow-md z-100"  />
      <div className="ml-64 flex-1 p-8 bg-gray-100">
        <ToastContainer />
        <h1 className="text-2xl font-bold mb-6">{isEditMode ? 'Update User' : 'Create New Admin'}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['firstName', 'lastName', 'practiceName', 'phone', 'streetAddress', 'city', 'state', 'zip'].map((field) => (
              <div key={field}>
                <label className=" text-sm font-medium mb-1 capitalize">
                  {field.replace(/([A-Z])/g, ' $1')} <span className="text-red-500">*</span>
                </label>
                <input
                  type={field === 'phone' || field === 'zip' ? 'number' : 'text'}
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                  placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
            ))}

            <div>
              <label className="text-sm font-medium mb-1">Email Address <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full border rounded p-2"
                disabled={isEditMode}
                readOnly={isEditMode}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1">Username <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="username"
                value={formData.username || ''}
                className="w-full border rounded p-2"
                disabled={isEditMode}
                readOnly={isEditMode}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Assign Roles <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="assignRoles"
                value={formData.assignRoles || ''}
                onChange={handleChange}
                placeholder="Enter Role"
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1">Status <span className="text-red-500">*</span></label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded p-2 cursor-pointer"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {!isEditMode && (
              <>
                <div>
                  <label className="text-sm font-medium mb-1">Password <span className="text-red-500">*</span></label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password || ''}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    className="w-full border rounded p-2"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1">Confirm Password <span className="text-red-500">*</span></label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword || ''}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="w-full border rounded p-2"
                    required
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-start space-x-4">
            {formData && formData.email && (
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                {isEditMode ? 'Update User' : 'Save'}
              </button>
            )}

            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={() => navigate('/admindashboard')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;
