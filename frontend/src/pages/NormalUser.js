// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../api/axiosInstance';

// const AdminDashboard = () => {
//     const [users, setUsers] = useState([]);
//     const [error, setError] = useState('');

//     // Fetch all users
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await axiosInstance.get('/users');
//                 setUsers(response.data);
//             } catch (err) {
//                 setError('Failed to fetch users');
//             }
//         };

//         fetchUsers();
//     }, []);

//     // Delete a user
//     const deleteUser = async (id) => {
//         try {
//             await axiosInstance.delete(`/users/${id}`);
//             setUsers(users.filter((user) => user._id !== id)); // Remove user from UI
//         } catch (err) {
//             setError('Failed to delete user');
//         }
//     };

//     return (
//         <div>
//             <h1>Admin Dashboard</h1>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Role</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map((user) => (
//                         <tr key={user._id}>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                             <td>{user.role}</td>
//                             <td>
//                                 <button onClick={() => deleteUser(user._id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdminDashboard;
