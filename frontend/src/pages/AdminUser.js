import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Admin = () => {
  const [users, setUsers] = useState([]); 
  const [currentUser, setCurrentUser] = useState(null); 
  const [message, setMessage] = useState(''); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [isAdmin, setIsAdmin] = useState(false);
  const baseUrl = process.env.REACT_APP_API_URL_DEV;


  // Fetch users and current user on component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          setError('No token found. Please log in again.');
          setLoading(false);
          return;
        }

        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        // Check for token expiration
        if (decoded.exp && decoded.exp < currentTime) {
          setError('Session expired. Please log in again.');
          localStorage.removeItem('adminToken');
          setLoading(false);
          return;
        }

        setIsAdmin(decoded.role === 'admin');

        // Fetch current user data
        const currentUserResponse = await axios.get(`${baseUrl}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentUser(currentUserResponse.data);

        // Fetch all users
        const usersResponse = await axios.get(`${baseUrl}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersResponse.data);

        setLoading(false);
      } catch (err) {
        setError(`Error: ${err.response?.data?.message || 'Failed to fetch data.'}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle delete user action
  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${baseUrl}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user._id !== id)); 
      setMessage('User deleted successfully.');
    } catch (err) {
      setMessage(`Error: ${err.response?.data?.message || 'Failed to delete user.'}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{isAdmin ? 'Admin Dashboard' : 'User Dashboard'}</h1>

      {message && <div className="text-green-600 mb-4">{message}</div>}

      {isAdmin && (
        <div>
          <h2 className="text-2xl mb-4">User Management</h2>
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Username</th>
                <th className="border px-4 py-2 text-left">Role</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-2xl mb-4">Your Profile</h2>
        {currentUser ? (
          <ul>
            <li>
              <strong>Name:</strong> {currentUser.name}
            </li>
            <li>
              <strong>Email:</strong> {currentUser.email}
            </li>
            <li>
              <strong>Role:</strong> {currentUser.role}
            </li>
          </ul>
        ) : (
          <p>Unable to load profile data.</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
