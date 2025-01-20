// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart, clearCart } from '../';
// import { useNavigate } from 'react-router-dom';

// const Checkout = () => {
//   const cart = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleRemove = (id) => {
//     dispatch(removeFromCart({ id }));
//   };

//   const handleProceedToBuy = () => {
//     alert('Proceeding to payment...');
//     navigate('/payment');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 px-6 py-10">
//       <h1 className="text-2xl font-bold mb-6">Checkout</h1>
//       {cart.items.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div>
//           <ul className="space-y-4">
//             {cart.items.map((item) => (
//               <li
//                 key={item.id}
//                 className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg"
//               >
//                 <div>
//                   <p className="font-bold">{item.name}</p>
//                   <p>${item.price.toFixed(2)}</p>
//                   <p>Quantity: {item.quantity}</p>
//                 </div>
//                 <button
//                   onClick={() => handleRemove(item.id)}
//                   className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <div className="mt-6 font-bold">
//             <p>Total Items: {cart.totalItems}</p>
//             <p>Total Amount: ${cart.totalAmount.toFixed(2)}</p>
//           </div>
//           <button
//             onClick={handleProceedToBuy}
//             className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//           >
//             Proceed to Buy
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Checkout;
