import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/Cartslice";
import { useNavigate } from "react-router-dom";

const products = [
  { id: 1, name: "Math", price: 150, imageUrl: "https://images.unsplash.com/photo-1684146771259-99b8b6089568?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fG1hdGglMjBib29rfGVufDB8fDB8fHww" },
  { id: 2, name: "Bio", price: 250, imageUrl: "https://images.unsplash.com/photo-1596069906600-1399c042a532?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmlvJTIwYm9va3xlbnwwfHwwfHx8MA%3D%3D" },
  { id: 3, name: "Computer", price: 300, imageUrl: "https://media.istockphoto.com/id/643897728/photo/woman-using-her-laptop.webp?a=1&b=1&s=612x612&w=0&k=20&c=z96TssnJpXSt2-cz5UfN5lzXeB9PX3sFJAoIFy41zj4=" },
  
];

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the number of items in the cart from the Redux store
  const cartItemCount = useSelector((state) => state.cart.items.reduce((acc, item) => acc + item.quantity, 0));

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-end mb-8">
          <button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => navigate("/cart")}
          >
            Cart ({cartItemCount})
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-xl shadow-2xl transform hover:scale-105 transition-all"
            >
              <div className="h-48 bg-gray-200 rounded-lg mb-4 flex justify-center items-center overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="text-3xl font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-xl text-gray-500 mb-4">${product.price}</p>
              <button
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg shadow-md hover:from-green-600 hover:to-teal-600 transition-all"
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
