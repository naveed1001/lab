import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./Sidebar";

const CreateLabTestForm = () => {
  const [formData, setFormData] = useState({
    testName: "",
    testCode: "",
    price: "",
    status: "Active",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");  

    try {
      const response = await axios.post(
        "http://localhost:8100/auth/lab-tests",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Lab Test created successfully!");
        navigate("/labs-list");
        setFormData({
          testName: "",
          testCode: "",
          price: "",
          status: "Active",
          description: "",
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "There was an error creating the lab test. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-100">
      <Sidebar className="fixed top-0 left-0 bottom-0 h-screen w-64 bg-white shadow-md z-50" />
      <div className="flex-1 min-h-screen bg-gray-50 ml-64">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
            <h1 className="text-xl font-bold">Lab Tests Manager</h1>
            <nav className="space-x-2">
              <button onClick={() => navigate('/admindashboard')} className="text-blue-500 font-semibold">
                Dashboard <span className="text-gray-500">/</span>
              </button>
              
              <button onClick={() => navigate('/labs-list')} className="text-blue-500 font-semibold">
                All Lab Tests <span className="text-gray-500">/</span>
              </button>
              <button onClick={() => navigate('/labs-create')} className="text-gray-500 font-semibold">
                Create Lab Tests
              </button>
            </nav>
          </div>
        </nav>

        <div className="max-w-4xl bg-white p-6 shadow-md rounded-md mx-auto mt-10">
          <h1 className="text-2xl font-semibold mb-4">Create New Lab Test</h1>

          {error && (
            <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
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
              <label className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter Description"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className={`bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none ${loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateLabTestForm;
