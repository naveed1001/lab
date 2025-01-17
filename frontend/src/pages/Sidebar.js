import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <h2 className="text-2xl font-bold p-4 text-center border-b border-gray-700 cursor-pointer"
                onClick={() => navigate('/admindashboard')}

        >
          <span className="text-cyan-500">Das</span>hbo<span className="text-cyan-500">ard</span>
        </h2>
      </div>
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        <ul>
          <li>
            <Link to="/admindashboard" className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white">
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/labs-create" className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white">
              <span className="ml-3">Create Lab Test</span>
            </Link>
          </li>
          <li>
            <Link to="/newadmin" className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white">
              <span className="ml-3">Create Admin User</span>
            </Link>
          </li>
          <li>
            <Link to="/labs-list" className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white">
              <span className="ml-3">All Lab Test</span>
            </Link>
          </li>

          <li className="mt-2">
            <select
              className="w-full text-left px-4 py-2 rounded-lg bg-gray-700 cursor-pointer"
              onChange={(e) => {
                const selectedValue = e.target.value;
                navigate(selectedValue);
              }}
            >
              <option value="">Select Admin Action</option>
              <option value="/admins">All Admins</option>
              <option value="/newadmin">Create Admin User</option>
            </select>
          </li>

          {/* Lab Test Action Select */}
          <li className="mt-2">
            <select
              className="w-full text-left px-4 py-2 rounded-lg bg-gray-700 cursor-pointer"
              onChange={(e) => {
                const selectedValue = e.target.value;
                navigate(selectedValue);
              }}
            >
              <option value="">Select Lab Test Action</option>
              <option value="/labs-list">All Labs Test</option>
              <option value="/labs-create">Create Lab Test</option>
            </select>
          </li>

          <li className="mt-2">
            <select
              className="w-full text-left px-4 py-2 rounded-lg bg-gray-700 cursor-pointer"
              onChange={(e) => {
                const selectedValue = e.target.value;
                navigate(selectedValue);
              }}
            >
              <option value="">Create Patient Profile</option>
              <option value="/create-patient">Create Patient</option>
              <option value="/all-patient">All Patient</option>
            </select>
          </li>

          <li className="mt-2">
            <select
              className="w-full text-left px-4 py-2 rounded-lg bg-gray-700 cursor-pointer"
              onChange={(e) => {
                const selectedValue = e.target.value;
                navigate(selectedValue);
              }}
            >
              <option value="">Create New Lab Profile</option>
              <option value="/create-new-lab">Create New Lab</option>
              <option value="/all-new-lab">All New Lab</option>
            </select>
          </li>
 
          <li>
            <Link to="/order" className="flex items-center p-2 mt-3 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white">
              <span className="ml-3">Save Records</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
