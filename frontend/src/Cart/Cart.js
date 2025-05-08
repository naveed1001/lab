import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../store/Cartslice";
const baseUrl = process.env.REACT_APP_API_URL_DEV;


const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total price of all items in the cart
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePurchase = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/book/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            name: item.name,
            description: item.name,
            quantity: item.quantity,
            unit_amount: { currency_code: "USD", value: item.price },
          })),
          totalAmount: totalPrice,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const { approvalUrl } = await response.json();
      window.location.href = approvalUrl;
    } catch (error) {
      console.error("Error during order creation:", error);
      alert("Failed to initiate payment");
    }
  };

  return (
    <div className="mt-10 mx-auto max-w-4xl p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-500">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                  <img
                    src={item.imageUrl} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">Price: ${item.price}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="px-3 py-1 bg-gray-300 rounded-full hover:bg-gray-400 focus:outline-none"
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: Math.max(1, item.quantity - 1),
                      })
                    )
                  }
                >
                  -
                </button>
                <button
                  className="px-3 py-1 bg-gray-300 rounded-full hover:bg-gray-400 focus:outline-none"
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity + 1,
                      })
                    )
                  }
                >
                  +
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                  onClick={() => dispatch(removeFromCart({ id: item.id }))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800">Total: ${totalPrice}</h3>
            <button
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all focus:outline-none"
              onClick={handlePurchase}
            >
              Purchase
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
