import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../pages/Sidebar";
const baseUrl = process.env.REACT_APP_API_URL_DEV;


const UpdateNewLab = () => {
    const { id } = useParams();
    const [lab, setLab] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState("");
    const [formData, setFormData] = useState({
        labName: "",
        location: "",
        email: "",
        status: "Active",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchLab = async () => {
            try {
                const response = await fetch(`${baseUrl}/auth/newlab/${id}`);
                if (!response.ok) throw new Error("Failed to fetch lab data");
                const data = await response.json();
                setLab(data);
                setFormData({
                    labName: data.labName,
                    location: data.location,
                    email: data.email,
                    status: data.status || "Active",
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchLab();
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
            const response = await fetch(`${baseUrl}/api/auth/newlab-update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error("Failed to update lab data");
            setSuccess("Lab updated successfully!");
            navigate("/all-new-lab"); 
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCancel = () => {
        navigate("/all-new-lab");
    };

    if (loading) {
        return <div className="text-center mt-10 text-lg">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }
  console.log('lab',lab);
  
    return (
        <div className="min-h-screen">
            <Sidebar />
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mt-6 ml-72">
                <h2 className="text-xl text-gray-700 mb-4 font-extralight">Update Lab</h2>
                {error && <div className="bg-red-500 text-white p-4 rounded mb-4">{error}</div>}
                {success && <div className="bg-green-500 text-white p-4 rounded mb-4">{success}</div>}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Lab Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="labName"
                            value={formData.labName}
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-md py-2 px-4 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Location <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
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
                            className="mt-1 w-full rounded-md py-2 px-4 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                            required
                            disabled
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
                    <div className="mt-6 flex justify-start space-x-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateNewLab;
