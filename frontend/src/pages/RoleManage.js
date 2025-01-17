// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from "react-toastify";

// const ManageUserRoles = () => {
//     const [users, setUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [newRole, setNewRole] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [updating, setUpdating] = useState(false);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             setLoading(true);
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     toast.error('No token found. Please log in.');
//                     window.location.href = '/login'; // Redirect to login page
//                     return;
//                 }
//                 const response = await axios.get('http://localhost:8100/auth/users', {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setUsers(response.data);
//                 toast.success('Users fetched successfully');
//             } catch (error) {
//                 console.error(error.response || error.message);
//                 toast.error('Failed to fetch users');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchUsers();
//     }, []);
    

//     const handleRoleUpdate = async (userId) => {
//         if (!newRole) {
//             toast.error('Please select a role');
//             return;
//         }

//         setUpdating(true);
//         try {
//             const token = localStorage.getItem('token');
//             await axios.put(
//                 `http://localhost:8100/auth/users/${userId}/role`,
//                 { role: newRole },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             toast.success('Role updated successfully');
//             setUsers((prevUsers) =>
//                 prevUsers.map((user) =>
//                     user._id === userId ? { ...user, role: newRole } : user
//                 )
//             );
//             setSelectedUser(null);
//             setNewRole('');
//         } catch (error) {
//             console.error(error.response || error.message);
//             toast.error('Failed to update role');
//         } finally {
//             setUpdating(false);
//         }
//     };

//     return (
//         <div>
//             <h1>Manage User Roles</h1>

//             {loading ? (
//                 <p>Loading users...</p>
//             ) : (
//                 <>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>Name</th>
//                                 <th>Email</th>
//                                 <th>Role</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {users.map((user) => (
//                                 <tr key={user._id}>
//                                     <td>{user._id}</td>
//                                     <td>{user.name}</td>
//                                     <td>{user.email}</td>
//                                     <td>{user.role}</td>
//                                     <td>
//                                         <button onClick={() => setSelectedUser(user)}>Update Role</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>

//                     {selectedUser && (
//                         <div>
//                             <h2>Update Role for {selectedUser.name}</h2>
//                             <select
//                                 value={newRole}
//                                 onChange={(e) => setNewRole(e.target.value)}
//                             >
//                                 <option value="" disabled>
//                                     Select a role
//                                 </option>
//                                 <option value="admin">Admin</option>
//                                 <option value="user">User</option>
//                                 <option value="editor">Editor</option>
//                                 <option value="viewer">Viewer</option>
//                             </select>
//                             <div>
//                                 <button
//                                     onClick={() => handleRoleUpdate(selectedUser._id)}
//                                     disabled={updating}
//                                 >
//                                     {updating ? 'Updating...' : 'Submit'}
//                                 </button>
//                                 <button onClick={() => setSelectedUser(null)}>Cancel</button>
//                             </div>
//                         </div>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default ManageUserRoles;
