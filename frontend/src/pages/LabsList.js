import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4 mx-5">All Lab Tests</h2>
      <button onClick={() =>navigate('/labs-create')} className="bg-blue-400 text-white py-2 px-3 mb-5 rounded-md mx-5">Create New Lab Test</button>
      <button className="bg-green-600 text-white rounded-md py-2 px-4">Import Labs</button>
      <button className="bg-yellow-600 text-white rounded-md py-2 px-4 mx-5">Export Labs</button> <br/>
      <label className="mx-4">Search:</label>
      <input type="search"  className=" px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-700 mb-4  " />

      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4">
          {error}
        </div>
      )}
      {loading ? (
        <p>Loading lab tests...</p>
      ) : labTests.length === 0 ? (
        <p>No lab tests available.</p>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Test Name</th>
                <th className="border px-4 py-2">Test Code</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Description</th>
                {isAdmin && <th className="border px-4 py-2">Actions</th>} 
              </tr>
            </thead>
            <tbody>
              {labTests.map((test, index) => (
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
