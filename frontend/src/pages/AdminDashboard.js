import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('currentUser');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const baseUrl = process.env.REACT_APP_API_URL_DEV;


  const navigate = useNavigate();
  const { id } = useParams();
  const deleteUser = async (id) => {


    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        toast.error('Authentication required. Please log in again.');
        return;
      }

      await axios.delete(`${baseUrl}/api/auth/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('User deleted successfully');
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (err) {
      console.error('Error deleting user:', err.response?.data || err.message);
      toast.error(`Failed to delete user: ${err.response?.data?.message || 'Unknown error'}`);
    }
  };
  console.log('id', id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError('No token found. Please log in again.');
          setLoading(false);
          return;
        }

        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp && decoded.exp < currentTime) {
          setError('Session expired. Please log in again.');
          localStorage.removeItem('authToken');
          setLoading(false);
          return;
        }

        setIsAdmin(decoded.role === 'admin');

        const userResponse = await axios.get(`${baseUrl}/api/auth/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentUser(userResponse.data.user);

        const usersResponse = await axios.get(`${baseUrl}/api/auth/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(usersResponse);
        setUsers(usersResponse.data.users || []);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (err.response) {
          console.error('API Error:', err.response);
          setError(err.response.data.message || 'An error occurred while fetching data.');
        } else {
          console.error('Network Error:', err);
          setError('An error occurred. Please check your connection and try again.');
        }
      }
    };

    fetchData();
  }, [baseUrl]);

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const paginatedUsers = useMemo(() => {
    const startIndex = currentPage * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage, usersPerPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleEntriesChange = (event) => {
    setUsersPerPage(Number(event.target.value));
    setCurrentPage(0);
  };

  if (loading) return <div className="text-center text-lg mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 text-lg mt-10">{error}</div>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      
      <div className="w-64 bg-gray-800 text-white flex flex-col h-screen">
        <h2 className="text-2xl font-bold p-4 text-center border-b border-gray-700 cursor-pointer "
        onClick={() => navigate('/admindashboard')}
        >
          <span className="text-cyan-500">Das</span>hbo<span className="text-cyan-500">ard</span>
        </h2>
        <ul className="flex flex-col p-4 space-y-2">
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'currentUser' ? 'bg-gray-700' : ''}`}
              onClick={() => setActiveTab('currentUser')}
            >
              Current User
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'allUsers' ? 'bg-gray-700 text-white' : 'bg-gray-700 text-white'
                }`}
              onClick={() => setActiveTab('allUsers')}
            >
              {isAdmin ? 'All Users' : 'Users'}
            </button>
          </li>

          {isAdmin && (
            <>
              {/* Admin Actions */}
              <li>
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

              {/* Lab Test Actions */}
              <li>
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
             
            </>
          )}
        
        {isAdmin && (
            <>
              <li>
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

              <li>
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
            <Link to="/order" className="flex items-center p-2 mt-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white">
              <span className="ml-3">Save Records</span>
            </Link>
          </li>
             
            </>
          )}
        
        

        </ul>
      </div>

      {/* Main Content */}
      {/* <div className='flex flex-1 justify-center items-start bg-slate-300 p-6'> */}
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto rounded-lg">
        {activeTab === 'currentUser' && (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Current User Profile</h2>
            {currentUser ? (
              <ul className="space-y-2">
                <li>
                  <span className="font-medium">Email:</span> {currentUser.email}
                </li>
                <li>
                  <span className="font-medium">Role:</span> {currentUser.role}
                </li>
              </ul>
            ) : (
              <p className="text-red-500">Unable to fetch your profile. Please try again later.</p>
            )}
          </div>
        )}

        {activeTab === 'allUsers' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">All Users</h2>

            {/* Search Bar */}
            {isAdmin && (
              <div className="mb-4 justify-end flex">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-max px-4 py-2 border border-gray-300 rounded-full shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}

            {/* Entries per page dropdown */}
            {isAdmin && (
              <div className="mb-4">
                <label htmlFor="entriesPerPage" className="mr-2 text-gray-700">Entries</label>
                <select
                  value={usersPerPage}
                  onChange={handleEntriesChange}
                  className="px-4 py-2 border border-gray-300 rounded-full cursor-pointer"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Email</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Role</th>
                    {isAdmin && <th className="border border-gray-200 px-4 py-2 text-center">Action</th>}
                    {/* {isAdmin && <th className="border border-gray-200 px-4 py-2 text-left">Edit</th>} */}

                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">{user.name}</td>
                      <td className="border border-gray-200 px-4 py-2">{user.email}</td>
                      <td className="border border-gray-200 px-4 py-2">{user.role}</td>
                      {isAdmin && (
                        <td className="border border-gray-200 px-4 py-2 text-center space-x-2">
                          <button
                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                            onClick={() => deleteUser(user._id)}
                          >
                            Delete
                          </button>
                          {isAdmin && (

                            <button
                              className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                              onClick={() => navigate(`/newadmin/${user._id}`)}
                            >
                              Update
                            </button>

                          )}
                        </td>
                      )}
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-center">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={Math.ceil(filteredUsers.length / usersPerPage)}
                onPageChange={handlePageChange}
                containerClassName={"flex space-x-2"}
                pageClassName={"px-4 py-2 border border-gray-300 rounded"}
                previousClassName={"px-4 py-2 border border-gray-300 rounded"}
                nextClassName={"px-4 py-2 border border-gray-300 rounded"}
                activeClassName={"bg-gray-700 text-white"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
    // </div>
  );
};

export default AdminDashboard;
