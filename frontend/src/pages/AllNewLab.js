import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../pages/Sidebar';
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllNewLab = () => {
    const [labs, setLabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(5);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchLabs = async () => {
            try {
                const response = await fetch('http://localhost:8100/auth/newlab-all');
                if (!response.ok) throw new Error('Failed to fetch lab data');
                const data = await response.json();
                setLabs(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLabs();
    }, []);

    const totalPage = Math.ceil(labs.length / entriesPerPage);
    const displayedLabs = labs.slice(
        (currentPage - 1) * entriesPerPage,
        currentPage * entriesPerPage
    );

    const handlePageChange = (data) => {
        setCurrentPage(data.selected + 1);
    };

    const handleUpdate = (id) => {
        console.log('Update lab with ID:', id);
        navigate(`/update-new-lab/${id}`);
    };
    
    const handleDelete = (id) => {
        console.log('Delete lab with ID:', id);
        
        fetch(`http://localhost:8100/auth/newlab-delete/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setLabs(prevLabs => prevLabs.filter(lab => lab._id !== id));
                toast.success('Lab deleted successfully!', {
                    
                });
            } else {
                toast.error('Failed to delete lab.', {
                    
                });
            }
        })
        .catch(error => {
            console.error('Error deleting lab:', error);
            toast.error('An error occurred while deleting the lab.', {
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
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Labs</h2>

                    {error && (
                        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="text-center py-6">Loading labs...</div>
                    ) : displayedLabs.length === 0 ? (
                        <div className="text-center py-6">No labs available.</div>
                    ) : (
                        <>
                            <table className="w-full table-auto border-collapse border border-gray-300">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border px-4 py-2 text-left">Lab Name</th>
                                        <th className="border px-4 py-2 text-left">Location</th>
                                        <th className="border px-4 py-2 text-left">Email</th>
                                        <th className="border px-4 py-2 text-left">Status</th>
                                        <th className="border px-4 py-2 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedLabs.map((lab) => (
                                        <tr key={lab._id}>
                                            <td className="border px-4 py-2">{lab.labName}</td>
                                            <td className="border px-4 py-2">{lab.location}</td>
                                            <td className="border px-4 py-2">{lab.email}</td>
                                            <td className="border px-4 py-2">{lab.status}</td>
                                            <td className="border px-4 py-2 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                                                        onClick={() => handleUpdate(lab._id)} 
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
                                                        onClick={() => handleDelete(lab._id)}
                                                    >
                                                        Delete
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

export default AllNewLab;
