import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PaginatedUsers = ({ searchQuery }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('authToken');
        if (!token) {
          toast.error('Authentication required. Please log in again.');
          return;
        }

        const response = await axios.get(`http://localhost:8100/auth/users`, {
          params: { page: currentPage, limit: 10, search: searchQuery },
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (err) {
        toast.error('Failed to load users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, searchQuery]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) return <div className="text-center text-lg mt-10">Loading...</div>;

  return (
    <div className="space-y-4">
      <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Email</th>
            <th className="border border-gray-200 px-4 py-2 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-4">No users found.</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2">{user.name}</td>
                <td className="border border-gray-200 px-4 py-2">{user.email}</td>
                <td className="border border-gray-200 px-4 py-2">{user.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 mx-2 bg-gray-300 rounded"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 mx-2 bg-gray-300 rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedUsers;
