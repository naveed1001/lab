// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// const LabTestUpdate = () => {
//   const { id } = useParams(); 
//   const navigate = useNavigate();
//   const [test, setTest] = useState({
//     testName: "",
//     testCode: "",
//     price: "",
//     status: "",
//     description: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchTest = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `http://localhost:8100/auth/lab-tests/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//             },
//           }
//         );
//         setTest(response.data);
//       } catch (err) {
//         console.error("Error fetching test details:", err); // Log the error to the console
//         setError(err.response?.data?.message || "Error fetching test details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTest();
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setTest((prevTest) => ({
//       ...prevTest,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `http://localhost:8100/auth/lab-tests/${id}`,
//         test,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           },
//         }
//       );
//       navigate("/labs-list"); // Redirect to the list page after update
//     } catch (err) {
//       console.error("Error updating test:", err); // Log the error to the console
//       setError(err.response?.data?.message || "Error updating test.");
//     }
//   };

//   return (
//     <div className="mt-10">
//       <h2 className="text-xl font-semibold mb-4 mx-5">Update Lab Test</h2>
//       {loading ? (
//         <p>Loading test details...</p>
//       ) : error ? (
//         <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4">{error}</div>
//       ) : (
//         <form onSubmit={handleSubmit} className="p-4 border border-gray-300 rounded">
//           <div className="mb-2">
//             <label className="block mb-1" htmlFor="testName">
//               Test Name
//             </label>
//             <input
//               type="text"
//               id="testName"
//               name="testName"
//               value={test.testName}
//               onChange={handleInputChange}
//               className="border border-gray-300 p-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-2">
//             <label className="block mb-1" htmlFor="testCode">
//               Test Code
//             </label>
//             <input
//               type="text"
//               id="testCode"
//               name="testCode"
//               value={test.testCode}
//               onChange={handleInputChange}
//               className="border border-gray-300 p-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-2">
//             <label className="block mb-1" htmlFor="price">
//               Price
//             </label>
//             <input
//               type="number"
//               id="price"
//               name="price"
//               value={test.price}
//               onChange={handleInputChange}
//               className="border border-gray-300 p-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-2">
//             <label className="block mb-1" htmlFor="status">
//               Status
//             </label>
//             <input
//               type="text"
//               id="status"
//               name="status"
//               value={test.status}
//               onChange={handleInputChange}
//               className="border border-gray-300 p-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-2">
//             <label className="block mb-1" htmlFor="description">
//               Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={test.description}
//               onChange={handleInputChange}
//               className="border border-gray-300 p-2 w-full"
//             />
//           </div>
//           <div className="flex justify-end mt-4">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//             >
//               Update
//             </button>
//             <button
//               type="button"
//               onClick={() => navigate("/labs-list")}
//               className="bg-gray-500 text-white px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default LabTestUpdate;
