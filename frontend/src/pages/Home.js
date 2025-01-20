import { Link, Navigate, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
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
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 to-blue-100">
      <header className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-indigo-200 to-blue-100 shadow-lg text-white">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold tracking-wide text-gray-700 ">Our App</h1>
          <nav className="hidden md:flex space-x-6 text-gray-700">
            <Link to="/productlist" className="hover:underline font-medium transition">
             Product-List
            </Link>
            <Link to="#" className="hover:underline font-medium transition">
              Patient Test
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/admindashboard" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm font-medium transition">
            User Role
          </Link>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium transition">
            Log Out
          </button>
        </div>
      </header>

      <main className="p-8 space-y-16">
        <div className="bg-gradient-to-r from-indigo-50 to-white p-10 rounded-lg shadow-sm text-center">
          <h1 className="text-4xl font-extrabold text-gray-700 mb-4">
            Welcome to Our App
          </h1>
          <p className="text-lg text-gray-600">
            A place to manage lab tests, patients, and more.
          </p>
        </div>

        {/* Added modern "hero" section */}
        <section className="flex justify-center items-center bg-gradient-to-r from-indigo-400 to-blue-500 p-16 rounded-xl shadow-xl text-white">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold mb-4">Start Managing Now</h2>
            <p className="text-lg mb-8">Create and manage lab tests and patients seamlessly</p>
            <div className="space-x-6">
              <Link
                to="#"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-xl font-medium transition"
              >
                Manage Lab Tests
              </Link>
              <Link
                to="#"
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-xl font-medium transition"
              >
                Manage Patients
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
