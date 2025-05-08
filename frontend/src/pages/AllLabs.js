import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateOrderForm = () => {
    const [labs, setLabs] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRecords, setSelectedRecords] = useState([]);
    const baseUrl = process.env.REACT_APP_API_URL_DEV;


    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${baseUrl}/api/auth/newlab-all`)
            .then((response) => setLabs(response.data))
            .catch((error) => console.error("Error fetching labs:", error));
    }, [baseUrl]);  // Add baseUrl to dependencies

    useEffect(() => {
        if (selectedOption) {
            axios
                .get(`${baseUrl}/api/auth/lab-tests?labId=${selectedOption}`)
                .then((response) => setFilteredData(response.data))
                .catch((error) => console.error("Error fetching lab tests:", error));
        }
    }, [selectedOption, baseUrl]); // Add baseUrl here

    useEffect(() => {
        if (searchTerm) {
            setFilteredData((prevData) =>
                prevData.filter((item) =>
                    item.testName?.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm]);

    const handleSaveRecords = () => {
        if (selectedRecords.length === 0) {
            toast.error("Please select at least one record to save.");
            return;
        }

        if (!selectedOption) {
            toast.error("Please select a lab.");
            return;
        }

        const selectedLab = labs.find((lab) => lab._id === selectedOption);

        if (!selectedLab || !selectedLab.email) {
            toast.error("Selected lab does not have an email associated.");
            return;
        }

        axios
            .post(`${baseUrl}/api/auth/save-records`, {
                type: "Labs",
                data: selectedRecords,
                email: selectedLab.email,
            })
            .then(() => {
                toast.success("Records saved and email sent successfully!");
                setSelectedRecords([]);
                setSelectedOption("");
                document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
                    checkbox.checked = false;
                });
            })
            .catch((error) => {
                console.error("Error saving records:", error);
                toast.error("Failed to save records or send email.");
            });
    };


    return (
        <div className="bg-white-200 min-h-screen shadow-md">
            <Sidebar />
            <div className="ml-72 p-8">
                <nav className="space-x-2 flex">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-0">Create New Order</h2>
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

                <div className="bg-white-900 p-6 rounded-lg mb-8">
                    <form>
                        <div className="mb-4">
                            <label htmlFor="option-select" className="font-medium text-gray-700 mb-2">
                                Select Lab
                            </label>
                            <select
                                id="option-select"
                                className="w-full border-gray-300 rounded-lg p-2 text-sm "
                                value={selectedOption}
                                onChange={(e) => setSelectedOption(e.target.value)}
                            >
                                <option value="">Choose a Lab</option>
                                {labs.map((lab) => (
                                    <option key={lab._id} value={lab._id}>
                                        {lab.labName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="search-data" className="block font-medium text-gray-700 mb-2">
                                Search
                            </label>
                            <input
                                type="text"
                                id="search-data"
                                className="w-full border-gray-300 rounded-lg p-2 text-sm"
                                placeholder="Search Tests Name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </form>
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-4">Available Tests
                        <span className="text-red-500">*</span>
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <div key={item._id} className="flex items-center">

                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 mr-4"
                                        id={`checkbox-${item._id}`}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedRecords((prev) => [...prev, item]);
                                            } else {
                                                setSelectedRecords((prev) =>
                                                    prev.filter((record) => record._id !== item._id)
                                                );
                                            }
                                        }}
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">
                                            {item.testName}
                                        </p>

                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-2 text-center text-sm text-gray-500">No records found</p>
                        )}
                    </div>
                    <div className="flex justify-center items-center mt-10">
                        <button
                            onClick={handleSaveRecords}
                            className="bg-blue-500 text-white py-3 px-8 rounded-md font-semibold"
                        >
                            Save Records
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CreateOrderForm;
