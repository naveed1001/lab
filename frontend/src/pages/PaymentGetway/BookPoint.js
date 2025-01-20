import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';

function BookAppointment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [successMessage, setSuccessMessage] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
 const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
        const response = await fetch('http://localhost:8100/book/createbook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Failed to create an appointment');
        }

        const data = await response.json();

        setSuccessMessage('Appointment created successfully!');
        console.log('Response:', data); 
        navigate('/productlist')
        setFormData({
          name: '',
          email: '',
          date: '',
          time: '',
          message: ''
        });
    } catch (error) {
        setError(error.message);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Sidebar />
      <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-4xl ml-64">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Book an Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message (Optional)</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Add any additional details..."
              rows="3"
            ></textarea>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}
          {successMessage && <div className="text-green-500 text-sm">{successMessage}</div>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={isLoading} 
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookAppointment;
