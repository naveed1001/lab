import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const baseUrl = process.env.REACT_APP_API_URL_DEV;


function FileUpload() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${baseUrl}/api/auth/import/csv`, {
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
      navigate('/labs-list');  

    } catch (error) {
      console.error("Error details:", error);
      toast.error("Error importing data: " + error.message);
    }
  };

  return (
    <div className="bg-slate-300 min-h-screen flex items-center justify-center">
      <Sidebar />
      <div className="text-center p-10 bg-white rounded-lg shadow-xl w-96">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Import Lab Tests</h2>
        <p className="text-gray-600 mb-4">Upload your CSV file to import lab test records.</p>
        
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className=" w-full py-2 px-4 mb-6 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        
        <button
          className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          onClick={handleUpload}
        >
          Import Labs
        </button>
      </div>
    </div>
  );
}

export default FileUpload;
