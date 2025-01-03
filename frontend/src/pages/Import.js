// import React, { useState } from 'react';

// const ImportPage = () => {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setMessage('Please select a file first.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch('http://localhost:8100/auth/import/csv', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to upload the file');
//       }

//       const data = await response.json();
//       setMessage(`${data.records} records imported successfully!`);
//     } catch (error) {
//       setMessage('Error importing data: ' + error.message);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold text-gray-800 mb-4">Import Labs Data</h1>
//       <p className="text-lg text-gray-600 mb-6">Upload your lab data as a CSV file.</p>
//       <input
//         type="file"
//         accept=".csv"
//         onChange={handleFileChange}
//         className="mb-4"
//       />
//       <button
//         onClick={handleUpload}
//         className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//       >
//         Upload CSV
//       </button>
//       {message && <p className="mt-4 text-lg text-gray-700">{message}</p>}
//     </div>
//   );
// };

// export default ImportPage;
