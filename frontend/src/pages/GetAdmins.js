import React, { useEffect, useState } from 'react';
import Sidebar from '../pages/Sidebar';

function GetAdmins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllAdmins = async () => {
    try {
      const response = await fetch('http://localhost:8100/auth/admins');
      if (!response.ok) {
        throw new Error(`Error fetching admins: ${response.statusText}`);
      }
      const data = await response.json();
      setAdmins(data.admins);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllAdmins();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex justify-center items-center p-6">
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-xl ml-64">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Admin List</h1>
          {loading && <p className="text-gray-500 text-lg text-center">Loading...</p>}
          {error && <p className="text-red-500 text-lg text-center">{error}</p>}
          {!loading && !error && (
            <>
              {admins.length === 0 ? (
                <p className="text-gray-500 text-lg text-center">No admins found.</p>
              ) : (
                <ul className="space-y-4">
                  {admins.map((admin, index) => (
                    <li
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-lg font-medium text-gray-700">{admin.name}</h2>
                          <p className="text-sm text-gray-500">{admin.email}</p>
                        </div>
                        {/* <button className="text-blue-600 hover:text-blue-800 focus:outline-none">
                          View Details
                        </button> */}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default GetAdmins;
