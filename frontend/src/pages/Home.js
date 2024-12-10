import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const HomePage = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate(); 

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-indigo-600">Our App</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Log Out
        </button>
      </header>

      <main className="p-8">
        <div className="bg-white p-10 rounded-lg shadow-lg text-center">
          <h1 className="text-4xl font-bold text-indigo-600 mb-4">Welcome to Our App</h1>
          <p className="text-gray-700 text-lg mb-6">
            Explore our features and get started by signing up or logging in.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/signup"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg font-medium hover:bg-indigo-700 transition"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg text-lg font-medium hover:bg-gray-400 transition"
            >
              Login
            </Link>
          </div>
        </div>

        <section className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16">
          {["JavaScript", "React.js", "Firebase"].map((skill, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-gray-800">{skill}</h3>
              <p className="text-gray-600">
                {skill === "JavaScript" && "Building interactive, performant web interfaces with modern JavaScript."}
                {skill === "React.js" && "Creating scalable, high-performance applications with React."}
                {skill === "Firebase" && "Developing real-time applications using Firebase for backend services."}
              </p>
            </div>
          ))}
        </section>

        <div className="text-center mt-16">
          <h1 className="text-5xl font-bold text-gray-900">Welcome! I'm Muhammad Bilal</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            A passionate Frontend Developer based in Pakistan, dedicated to crafting high-quality, user-centric web applications using the latest technologies.
          </p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
