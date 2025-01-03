// import React from 'react';

// const ExportPage = () => {
//   const downloadCSV = async () => {
//     try {
//       const response = await fetch('http://localhost:8100/auth/export/csv', {
//         method: 'GET',
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       }

//       const blob = await response.blob();

//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'usersData.csv'; 
//       document.body.appendChild(a);
//       a.click();

//       a.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error('Error downloading CSV:', error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold text-gray-800 mb-4">Export Labs Page</h1>
//       <p className="text-lg text-gray-600 mb-6">Here you can export your lab data.</p>
//       <button
//         onClick={downloadCSV}
//         className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//       >
//         Export CSV
//       </button>
//     </div>
//   );
// };

// export default ExportPage;
