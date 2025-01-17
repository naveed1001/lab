import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/book');
    };

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
                <h2 className="text-3xl font-bold mb-4 text-green-700">Payment Successful!</h2>
                <p className="text-gray-600">Thank you for your payment. Your transaction has been completed successfully.</p>
                <button
                    onClick={handleGoHome}
                    className="mt-4 inline-block bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700"
                >
                    Go to Back
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
