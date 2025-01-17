import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(5);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch('http://localhost:8100/auth/patient-all');
                if (!response.ok) throw new Error('Failed to fetch patient data');
                const data = await response.json();
                setPatients(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    const totalPage = Math.ceil(patients.length / entriesPerPage);
    const displayedPatients = patients.slice(
        (currentPage - 1) * entriesPerPage,
        currentPage * entriesPerPage
    );

    const handlePageChange = (data) => {
        setCurrentPage(data.selected + 1);
    };

    const handleUpdate = (id) => {
        console.log('Update patient with ID:', id);
        navigate(`/update-patient/${id}`);
    };

    const handleDelete = (id) => {
        console.log('Delete patient with ID:', id);
        
        fetch(`http://localhost:8100/auth/patient-delete/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setPatients(prevPatients => prevPatients.filter(patient => patient._id !== id));
                toast.success('Patient deleted successfully!', {
                   
                });
            } else {
                toast.error('Failed to delete patient.', {
                });
            }
        })
        .catch(error => {
            console.error('Error deleting patient:', error);
            toast.error('An error occurred while deleting the patient.', {
            });
        });
    };

    if (loading) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }
   console.log('setEntriesPerPage',setEntriesPerPage);
   
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex flex-1 justify-center items-start bg-slate-50 p-6">
                <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 ml-64">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Patients</h2>

                    {error && (
                        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="text-center py-6">Loading patients...</div>
                    ) : displayedPatients.length === 0 ? (
                        <div className="text-center py-6">No patients available.</div>
                    ) : (
                        <>
                            <table className="w-full table-auto border-collapse border border-gray-300">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border px-4 py-2 text-left">Name</th>
                                        <th className="border px-4 py-2 text-left">Email</th>
                                        <th className="border px-4 py-2 text-left">Zip Code</th>
                                        <th className="border px-4 py-2 text-left">Phone</th>
                                        <th className="border px-4 py-2 text-left">Street/State/City</th>
                                        <th className="border px-4 py-2 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedPatients.map((patient) => (
                                        <tr key={patient.id}>
                                            <td className="border px-4 py-2">{patient.firstName}  {patient.lastName}</td>
                                            <td className="border px-4 py-2">{patient.email}</td>
                                            <td className="border px-4 py-2">{patient.zip}</td>
                                            <td className="border px-4 py-2">{patient.phone}</td>
                                            <td className="border px-4 py-2">{patient.state}, {patient.street}, {patient.city}</td>
                                            <td className="border px-4 py-2 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                                                        onClick={() => handleUpdate(patient._id)} 
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
                                                        onClick={() => handleDelete(patient._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                                                        onClick={() => navigate('/order')}
                                                    >
                                                        Order
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="mt-6 flex justify-center">
                                <ReactPaginate
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    pageCount={totalPage}
                                    onPageChange={handlePageChange}
                                    containerClassName={"flex space-x-2"}
                                    pageClassName={"px-4 py-2 border border-gray-300 rounded-md"}
                                    previousClassName={"px-4 py-2 border border-gray-300 rounded-md"}
                                    nextClassName={"px-4 py-2 border border-gray-300 rounded-md"}
                                    activeClassName={"bg-blue-500 text-white"}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default PatientList;
