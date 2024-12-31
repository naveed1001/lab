// // LabTestUpdateForm.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// const LabTestUpdateForm = () => {
//   const [updatedTest, setUpdatedTest] = useState({
//     testName: "",
//     testCode: "",
//     price: "",
//     status: "",
//     description: "",
//   });
//   const [error, setError] = useState("");
//   const { id } = useParams(); // Get the ID from the URL params
//   const navigate = useNavigate();

//   // Fetch the lab test data by ID
//   useEffect(() => {
//     const fetchLabTest = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8100/auth/lab-tests/${id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           },
//         });
//         setUpdatedTest(response.data);
//       } catch (err) {
//         setError(err.response?.data?.message || "Error fetching lab test.");
//       }
//     };
//     fetchLabTest();
//   }, [id]);

//   // Handle input changes for updating the lab test
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedTest((prevTest) => ({
//       ...prevTest,
//       [name]: value,
//     }));
//   };

//   // Handle form submission to update the lab test
//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `http://localhost:8100/auth/lab-tests/${id}`,
//         updatedTest,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           },
//         }
//       );
//       navigate("/labs-list"); // Navigate to the labs list after update
//     } catch (err) {
//       setError(err.response?.data?.message || "Error updating lab test.");
//     }
//   };

//   return (
//     <div className="mt-10">
//       <h2 className="text-xl font-semibold mb-4">Update Lab Test</h2>
//       {error && (
//         <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4">
//           {error}
//         </div>
//       )}
//       <form onSubmit={handleUpdateSubmit}>
//         <div className="mb-2">
//           <label className="block mb-1" htmlFor="testName">
//             Test Name
//           </label>
//           <input
//             type="text"
//             id="testName"
//             name="testName"
//             value={updatedTest.testName}
//             onChange={handleInputChange}
//             className="border border-gray-300 p-2 w-full"
//             required
//           />
//         </div>
//         <div className="mb-2">
//           <label className="block mb-1" htmlFor="testCode">
//             Test Code
//           </label>
//           <input
//             type="text"
//             id="testCode"
//             name="testCode"
//             value={updatedTest.testCode}
//             onChange={handleInputChange}
//             className="border border-gray-300 p-2 w-full"
//             required
//           />
//         </div>
//         <div className="mb-2">
//           <label className="block mb-1" htmlFor="price">
//             Price
//           </label>
//           <input
//             type="number"
//             id="price"
//             name="price"
//             value={updatedTest.price}
//             onChange={handleInputChange}
//             className="border border-gray-300 p-2 w-full"
//             required
//           />
//         </div>
//         <div className="mb-2">
//           <label className="block mb-1" htmlFor="status">
//             Status
//           </label>
//           <input
//             type="text"
//             id="status"
//             name="status"
//             value={updatedTest.status}
//             onChange={handleInputChange}
//             className="border border-gray-300 p-2 w-full"
//             required
//           />
//         </div>
//         <div className="mb-2">
//           <label className="block mb-1" htmlFor="description">
//             Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             value={updatedTest.description}
//             onChange={handleInputChange}
//             className="border border-gray-300 p-2 w-full"
//           />
//         </div>
//         <div className="flex justify-end mt-4">
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//           >
//             Update
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate("/labs-list")}
//             className="bg-gray-500 text-white px-4 py-2 rounded"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LabTestUpdateForm;
