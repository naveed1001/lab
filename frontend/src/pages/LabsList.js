import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import Sidebar from "./Sidebar";
const baseUrl = process.env.REACT_APP_API_URL_DEV;


const LabTestsList = () => {
  const [labTests, setLabTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [updatedTest, setUpdatedTest] = useState({
    testName: "",
    testCode: "",
    price: "",
    status: "",
    description: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  const fetchLabTests = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${baseUrl}/auth/lab-tests`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setLabTests(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "There was an error fetching the lab tests."
      );
    } finally {
      setLoading(false);
    }
  };

  const checkAdminRole = () => {
    const userToken = localStorage.getItem("authToken");
    if (userToken) {
      const decodedToken = JSON.parse(atob(userToken.split('.')[1]));
      setIsAdmin(decodedToken.role === "admin");
    }
  };

  const handleUpdateClick = (test) => {
    setIsEditing(true);
    setSelectedTest(test);
    setUpdatedTest({
      testName: test.testName,
      testCode: test.testCode,
      price: test.price,
      status: test.status,
      description: test.description || "",
    });
  };

  const handleDeleteClick = async (id) => {
    toast.info("Are you sure you want to delete this lab test?", {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      onClose: async () => {
        try {
          await axios.delete(`${baseUrl}/auth/lab-tests/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });

          fetchLabTests();
          toast.success("Lab test successfully deleted!");
        } catch (err) {
          toast.error(
            err.response?.data?.message || "There was an error deleting the lab test."
          );
        }
      },
    });
  };

  const navigate = useNavigate();

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const isDuplicate = labTests.some(
      (test) => test.testCode === updatedTest.testCode && test._id !== selectedTest._id
    );

    if (isDuplicate) {
      toast.error("Test code already exists. Please use a unique test code.");
      return;
    }

    try {
      await axios.put(
        `${baseUrl}/auth/lab-tests/${selectedTest._id}`,
        updatedTest,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      toast.success("Lab test updated successfully!");
      setIsEditing(false);
      fetchLabTests();
    } catch (err) {
      setError(
        err.response?.data?.message || "There was an error updating the lab test."
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTest((prevTest) => ({
      ...prevTest,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchLabTests();
    checkAdminRole();
  }, []);

  const filteredLabTests = labTests.filter(
    (test) =>
      test.testName.toLowerCase().includes(search.toLowerCase()) ||
      test.testCode.toLowerCase().includes(search.toLowerCase()) ||
      test.price.toString().includes(search)
  );

  const totalpage = Math.ceil(filteredLabTests.length / entriesPerPage);
  const displaylabtest = filteredLabTests.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handlePageChange = (data) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
  };

  const downloadCSV = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/export/csv`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'usersData.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-1 justify-center items-start bg-slate-50 p-6">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 ml-64">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Lab Tests</h2>
          <div className="mb-6 flex justify-between items-center">
            <button
              onClick={() => navigate('/labs-create')}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600"
            >
              Create New Lab Test
            </button>
            <div className="space-x-4">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600"
                onClick={() => navigate('/fileupload')}
              >
                Import Labs
              </button>
              <button
                className="bg-yellow-500 text-white py-2 px-4 rounded-lg shadow hover:bg-yellow-600"
                onClick={downloadCSV}
              >
                Export Labs
              </button>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <label className="font-semibold mr-2">Search:</label>
            <input
              type="search"
              className="p-2 border rounded-full focus:outline-none focus:ring focus:ring-blue-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <label className="font-semibold ml-4 mr-2">Entries per page:</label>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="py-2 px-4 rounded-full border focus:ring focus:ring-blue-400"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-6">Loading lab tests...</div>
          ) : displaylabtest.length === 0 ? (
            <div className="text-center py-6">No lab tests available.</div>
          ) : (
            <>
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2 text-left">SI</th>
                    <th className="border px-4 py-2 text-left">Test Name</th>
                    <th className="border px-4 py-2 text-left">Test Code</th>
                    <th className="border px-4 py-2 text-left">Price</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                    <th className="border px-4 py-2 text-left">Description</th>
                    {isAdmin && <th className="border px-4 py-2 text-left">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {displaylabtest.map((test, index) => (
                    <tr key={test._id}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{test.testName}</td>
                      <td className="border px-4 py-2">{test.testCode}</td>
                      <td className="border px-4 py-2">{test.price}</td>
                      <td className="border px-4 py-2">{test.status}</td>
                      <td className="border px-4 py-2">{test.description || "N/A"}</td>
                      {isAdmin && (
                        <td className="border px-4 py-2">
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-blue-600"
                            onClick={() => handleUpdateClick(test)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                            onClick={() => handleDeleteClick(test._id)}
                          >
                            Delete
                          </button>
                          {/* <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                            onClick={() => navigate('/order')}
                          >
                            Order
                          </button> */}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-6 flex justify-center">
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={totalpage}
                  onPageChange={handlePageChange}
                  containerClassName={"flex space-x-2"}
                  pageClassName={"px-4 py-2 border border-gray-300 rounded-md"}
                  previousClassName={"px-4 py-2 border border-gray-300 rounded-md"}
                  nextClassName={"px-4 py-2 border border-gray-300 rounded-md"}
                  activeClassName={"bg-blue-500 text-white"}
                />
              </div>

              {isEditing && (
                <div className="mt-6 p-6 border rounded-lg shadow-lg bg-white">
                  <h3 className="text-xl font-semibold mb-4">Update Lab Test</h3>
                  <form onSubmit={handleUpdateSubmit}>
                    <div className="mb-4">
                      <label className="block mb-2" htmlFor="testName">
                        Test Name
                      </label>
                      <input
                        type="text"
                        id="testName"
                        name="testName"
                        value={updatedTest.testName}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-2" htmlFor="testCode">
                        Test Code
                      </label>
                      <input
                        type="text"
                        id="testCode"
                        name="testCode"
                        value={updatedTest.testCode}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-2" htmlFor="price">
                        Price
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={updatedTest.price}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-2" htmlFor="status">
                        Status
                      </label>
                      <input
                        type="text"
                        id="status"
                        name="status"
                        value={updatedTest.status}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-2" htmlFor="description">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={updatedTest.description}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md mr-4"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-500 text-white py-2 px-4 rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LabTestsList;
