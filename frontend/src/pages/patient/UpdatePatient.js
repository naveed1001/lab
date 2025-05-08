import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar";
const baseUrl = process.env.REACT_APP_API_URL_DEV;


const UpdatePatientPage = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        status: "Active",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/auth/patient/${id}`);
                if (!response.ok) throw new Error("Failed to fetch patient data");
                const data = await response.json();
                setPatient(data);
                setFormData({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    street: data.street,
                    city: data.city,
                    state: data.state,
                    zip: data.zip,
                    status: data.status || "Active",
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPatient();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            const response = await fetch(`${baseUrl}/api/auth/patient-update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error("Failed to update patient data");
            setSuccess("Patient updated successfully!");
            navigate("/all-patient");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCancel = () => {
        navigate("/all-patient");
    };

    if (loading) {
        return <div className="text-center mt-10 text-lg">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }
 console.log('patient',patient);
 
    return (
        <div className="min-h-screen ">
            <Sidebar />
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mt-6 ml-72">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Update Patient</h2>
                {error && <div className="bg-red-500 text-white p-4 rounded mb-4">{error}</div>}
                {success && <div className="bg-green-500 text-white p-4 rounded mb-4">{success}</div>}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-md py-2 px-4 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
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
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-md py-2 px-4 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
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
                            onChange={handleInputChange}
                            disabled
                            className="mt-1 w-full rounded-md py-2 px-4 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
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
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-md py-2 px-4 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Street <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-md py-2 px-4 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
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
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-md py-2 px-4 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
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
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-md py-2 px-4 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
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
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-md py-2 px-4 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
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
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-md py-2 px-4 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </form>
                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                    
                        className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                       
                    >
                        Update
                    </button>
                   
                </div>
            </div>
        </div>
    );
};

export default UpdatePatientPage;
