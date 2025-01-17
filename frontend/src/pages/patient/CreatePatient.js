import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";

const CreatePatientProfile = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        email: "",
        password: "",
        confirmPassword: "",
        status: "Active",
    });

    const [error, setError] = useState(""); 
    const [success, setSuccess] = useState(""); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 
        setSuccess(""); 

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const formattedPhone = formatPhoneNumber(formData.phone);

        const updatedFormData = {
            ...formData,
            phone: formattedPhone,
        };

        try {
            const response = await fetch('http://localhost:8100/auth/patient-create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFormData),
            });

            if (!response.ok) {
                throw new Error('Failed to create patient.');
            }

            const data = await response.json();
            setSuccess('Patient created successfully!',data);
            navigate('/all-patient');
        } catch (error) {
            setError('Error creating patient: ' + error.message);
        }
    };

    const formatPhoneNumber = (phone) => {
        if (phone && !phone.startsWith('+')) {
            return `+${phone}`;
        }
        return phone;
    };

    const handleCancel = () => {
        navigate('/all-patient');
    };

    return (
        <div>
            <Sidebar />
            <nav className="mb-4 flex items-center space-x-2 py-3 ml-72 ">
                <h2 className="text-xl font-semibold text-gray-700 mb-0">Create New Patient</h2>

                <button
                    onClick={() => navigate('/admindashboard')}
                    className="text-blue-500 font-semibold hover:underline"
                >
                    Dashboard
                </button>

                <span className="text-gray-500">/</span>

                <button
                    onClick={() => navigate('/all-patient')}
                    className="text-blue-500 font-semibold hover:underline"
                >
                    All Patient
                </button>

                <span className="text-gray-500">/</span>

                <button className="text-blue-500 font-semibold hover:underline"
                    onClick={() => navigate('/create-patient')}
                >
                    Create Patient
                </button>
            </nav>

            <div className="min-h-screen bg-gray-100 p-4">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 ml-72">
                    {error && (
                        <div className="bg-red-500 text-white p-4 rounded mb-4">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-500 text-white p-4 rounded mb-4">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">First Name <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700">Last Name  <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700">Date of Birth  <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700">Phone<span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700">Street Address <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700">City <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700">State <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700">Zip Code <span className="text-red-500">*</span></label>
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Country <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700">Confirm Password <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700">Status <span className="text-red-500">*</span></label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="mt-1 w-full rounded-md py-2 px-4 border-none shadow-md focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePatientProfile;
