import React, { useState } from "react";
import Sidebar from "./Sidebar";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreateNewLab = () => {
  const [formData, setFormData] = useState({
    labName: "",
    location: "",
    email: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    try {
        const response = await axios.post('http://localhost:8100/auth/create-new-lab',formData);

        if(response.status === 201){
            console.log("Lab created:", response.data);
            toast.success("Lab Created")
            setFormData({ labName: "", location: "", email: "", status: "Active" });

        }
            else {
                console.error("Failed to create lab:", response.statusText);
              }
        
    } catch (error) {
        console.error("Error occurred while creating lab:", error);

    }

  };

  const handleCancel = () => {
    setFormData({ labName: "", location: "", email: "", status: "Active" });
  };

  return (
   
    
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto mt-20 ml-80 ">
        <Sidebar />
      <h1 className="text-2xl font-bold mb-4">Create New Lab</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="labName" className="block font-medium text-gray-700">
              Lab Name
            </label>
            <input
              type="text"
              id="labName"
              name="labName"
              value={formData.labName}
              onChange={handleChange}
              placeholder="Enter Lab Name"
              className="mt-1 w-full rounded-md py-2 px-4 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label htmlFor="location" className="block font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter Location"
              className="mt-1 w-full rounded-md py-2 px-4 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">
              Lab Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Lab Email"
              className="mt-1 w-full rounded-md py-2 px-4 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label htmlFor="status" className="block font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 w-full rounded-md py-2 px-4 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
   
  );
};

export default CreateNewLab;
