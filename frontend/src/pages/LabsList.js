import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';

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
  const [file, setFile] = useState()
  const fetchLabTests = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:8100/auth/lab-tests", {
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
  console.log('loading', loading)
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
          await axios.delete(`http://localhost:8100/auth/lab-tests/${id}`, {
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
        `http://localhost:8100/auth/lab-tests/${selectedTest._id}`,
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

  const totalpage = Math.ceil(filteredLabTests.length / entriesPerPage)
  const displaylabtest = filteredLabTests.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  )

  const handlePageChange = (data) => {
    const selectedPage = data.selected + 1; 
    setCurrentPage(selectedPage);
  };
  console.log('total', totalpage);
  console.log('current', setCurrentPage);

  const downloadCSV = async () => {
    try {
      const response = await fetch('http://localhost:8100/auth/export/csv', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      // The blob() method reads the response body as a binary large object (Blob). 
      // This converts the CSV data into a format that can be downloaded.
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      // The href attribute of the anchor element is set to the temporary URL 
      //  which will be used to download the file.
      a.href = url;
      a.download = 'usersData.csv';
      document.body.appendChild(a);
      // The click() method simulates a click on the anchor element, triggering the file download.
      a.click();
      // After the click, the anchor element is removed from the DOM, as it's no longer needed.
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8100/auth/import/csv", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        throw new Error("Failed to upload the file: " + errorData.message);
      }

      const data = await response.json();
      toast.success(`${data.records} records imported successfully!`);
      fetchLabTests();
    } catch (error) {
      console.error("Error details:", error);
      toast.error("Error importing data: " + error.message);
    }
  };


  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4 mx-5">All Lab Tests</h2>
      <button onClick={() => navigate('/labs-create')} className="bg-blue-400 text-white py-2 px-3 mb-5 rounded-md mx-5">Create New Lab Test</button>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4 mx-4"
      />
      <button
        className="bg-green-600 text-white rounded-md py-2 px-4"
        onClick={handleUpload}
      >
        Import Labs
      </button>
      <button className="bg-yellow-600 text-white rounded-md py-2 px-4 mx-5"
        onClick={downloadCSV}
      >Export Labs</button> <br />
      <label className="mx-4 font-semibold">Search:</label>
      <input type="search" className=" px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-700 mb-4  "
        value={search}
        onChange={(e) => setSearch(e.target.value)}

      />
      <label className="mx-4 font-semibold">entries:</label>
      <select
        value={entriesPerPage}
        onChange={(e) => setEntriesPerPage(Number(e.target.value))}
        className="py-2 px-4 rounded mb-4 cursor-pointer"
      >

        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>

      </select>

      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4">
          {error}
        </div>
      )}
      {loading ? (
        <p>Loading lab tests...</p>
      ) : displaylabtest.length === 0 ? (
        <p>No lab tests available.</p>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">SI</th>
                <th className="border px-4 py-2">Test Name</th>
                <th className="border px-4 py-2">Test Code</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Description</th>
                {isAdmin && <th className="border px-4 py-2">Actions</th>}
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
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                        onClick={() => handleUpdateClick(test)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDeleteClick(test._id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-center">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={totalpage}
              onPageChange={handlePageChange}
              containerClassName={"flex space-x-2"}
              pageClassName={"px-4 py-2 border border-gray-300 rounded"}
              previousClassName={"px-4 py-2 border border-gray-300 rounded"}
              nextClassName={"px-4 py-2 border border-gray-300 rounded"}
              activeClassName={"bg-gray-700 text-white"}
            />
          </div>
          {isEditing && (
            <div className="mt-4 p-4 border border-gray-300 rounded">
              <h3 className="text-xl font-semibold mb-2">Update Lab Test</h3>
              <form onSubmit={handleUpdateSubmit}>
                <div className="mb-2">
                  <label className="block mb-1" htmlFor="testName">
                    Test Name
                  </label>
                  <input
                    type="text"
                    id="testName"
                    name="testName"
                    value={updatedTest.testName}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-1" htmlFor="testCode">
                    Test Code
                  </label>
                  <input
                    type="text"
                    id="testCode"
                    name="testCode"
                    value={updatedTest.testCode}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-1" htmlFor="price">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={updatedTest.price}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-1" htmlFor="status">
                    Status
                  </label>
                  <input
                    type="text"
                    id="status"
                    name="status"
                    value={updatedTest.status}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-1" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={updatedTest.description}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
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
  );
};

export default LabTestsList;
