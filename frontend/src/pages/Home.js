import React, { useState} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "./AuthContext";

const HomePage = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-indigo-200 to-blue-100 shadow-lg text-white">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold tracking-wide text-gray-700 ">Our App</h1>
          <nav className="hidden md:flex space-x-6 text-gray-700">
            <Link to="" className="hover:underline font-medium transition">
              Labs Test
            </Link>
            <Link to="" className="hover:underline font-medium transition">
              Patient Test
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/admindashboard" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm font-medium transition">
            User Role
          </Link>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium transition">
            Log Out
          </button>
        </div>
      </header>

      <main className="p-8">
        <div className="bg-gradient-to-r from-indigo-50 to-white p-10 rounded-lg shadow-sm text-center">
          <h1 className="text-4xl font-extrabold text-gray-700 mb-4">
            Welcome to Our App
          </h1>
        </div>

        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-700">Create New Lab Test</h2>
          <LabTestForm />
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">Create New Patient</h2>
          <PatientCreateForm />
        </section>

      </main>
    </div>
  );
};

const LabTestForm = () => {
  const [formData, setFormData] = useState({
    testName: '',
    testCode: '',
    price: '',
    status: 'Active',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        toast.error('No token found');
        return;
      }

      const response = await fetch('http://localhost:8100/auth/lab-tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Lab test saved successfully');
        setFormData({
          testName: '',
          testCode: '',
          price: '',
          status: 'Active',
          description: '',
        });
      } else {
        toast.error('Error saving lab test');
      }
    } catch (error) {
      toast.error('Error saving lab test');
    } finally {
      setLoading(false);
    }
  };

  return (
<form onSubmit={handleSubmit} className="bg-gradient-to-r from-indigo-100 to-white p-8 rounded-lg shadow-lg">
<div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-gray-700 font-medium mb-2">
            Test Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="testName"
            value={formData.testName}
            onChange={handleChange}
            placeholder="Enter Test Name"
            className="w-full py-2 px-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <label className="text-gray-700 font-medium mb-2">
            Test Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="testCode"
            value={formData.testCode}
            onChange={handleChange}
            placeholder="Enter Test Code"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <label className="text-gray-700 font-medium mb-2">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter Price"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter Description"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="flex justify-center mb-8">
      <button
          type="submit"
          className={`bg-blue-500 text-white text-xl px-20 py-3 rounded-md hover:bg-blue-600 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

const PatientCreateForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    email: '',
    password: '',
    confirmPassword: '',
    status: 'Active',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        toast.error('No token found');
        return;
      }

      const response = await fetch('http://localhost:8100/auth/patient-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Patient created successfully');
        setFormData({
          firstName: '',
          lastName: '',
          dob: '',
          phone: '',
          street: '',
          city: '',
          state: '',
          zip: '',
          country: '',
          email: '',
          password: '',
          confirmPassword: '',
          status: 'Active',
        });
      } else {
        toast.error('Error creating patient');
      }
    } catch (error) {
      toast.error('Error creating patient');
    } finally {
      setLoading(false);
    }
  };

  return (
<form onSubmit={handleSubmit} className="bg-gradient-to-r from-indigo-100 to-white p-8 rounded-lg shadow-lg">
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div>
      <label className="text-sm font-medium text-gray-700">
        First Name <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="Enter First Name"
        className="mt-1 w-full rounded-md py-2 px-4 border-none shadow-md focus:border-indigo-500 focus:ring-indigo-500"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Last Name <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Enter Last Name"
        className="mt-1 w-full rounded-md py-2 px-4 border-none shadow-md focus:border-indigo-500 focus:ring-indigo-500"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Date of Birth <span className="text-red-500">*</span>
      </label>
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        className="mt-1 w-full rounded-md py-2 px-4 border-none shadow-md focus:border-indigo-500 focus:ring-indigo-500"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Phone <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="xxx-xxx-xxxx"
        className="mt-1 w-full rounded-md py-2 px-4 border-none shadow-md focus:border-indigo-500 focus:ring-indigo-500"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Street Address <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="street"
        value={formData.street}
        onChange={handleChange}
        placeholder="Enter Street Address"
        className="mt-1 w-full rounded-md py-2 px-4 border-none shadow-md focus:border-indigo-500 focus:ring-indigo-500"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">
        City <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="Enter City"
        className="mt-1 w-full rounded-md py-2 px-4 border-none shadow-md focus:border-indigo-500 focus:ring-indigo-500"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">
        State <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="state"
        value={formData.state}
        onChange={handleChange}
        placeholder="Enter State"
        className="mt-1 w-full rounded-md py-2 px-4 border-none shadow-md focus:border-indigo-500 focus:ring-indigo-500"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Zip Code <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="zip"
        value={formData.zip}
        onChange={handleChange}
        placeholder="Enter Zip Code"
        className="mt-1 w-full rounded-md py-2 px-4 border-none shadow-md focus:border-indigo-500 focus:ring-indigo-500"
        required
      />
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Country <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="country"
        value={formData.country}
        onChange={handleChange}
        placeholder="Enter Country"
        className="mt-1 w-full rounded-md py-2 px-4 border-none shadow-md focus:border-indigo-500 focus:ring-indigo-500"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Email <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter Email"
        className="mt-1 w-full rounded-md py-2 px-4 border-none shadow-md focus:border-indigo-500 focus:ring-indigo-500"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Password <span className="text-red-500">*</span>
      </label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter Password"
        className="mt-1 w-full rounded-md py-2 px-4 border-none shadow-md focus:border-indigo-500 focus:ring-indigo-500"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Confirm Password <span className="text-red-500">*</span>
      </label>
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        className="mt-1 w-full rounded-md py-2 px-4 border-none shadow-md focus:border-indigo-500 focus:ring-indigo-500"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Status <span className="text-red-500">*</span>
      </label>
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="mt-1 w-full rounded-md py-2 px-4 border-none shadow-md focus:border-indigo-500 focus:ring-indigo-500"
        required
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
  </div>

  <div className="flex justify-center mb-4">
    <button
      type="submit"
      className={`bg-blue-500 text-white py-3 px-10 text-xl rounded-md hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={loading}
    >
      {loading ? 'Saving...' : 'Create Patient'}
    </button>
  </div>
</form>
  );
};

export default HomePage;
