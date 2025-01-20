import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentGateway = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const capturePayment = async () => {
            try {
                const queryParams = new URLSearchParams(location.search);
                const orderId = queryParams.get('token');

                if (!orderId) {
                    throw new Error('Payment token is missing');
                }

                const response = await fetch(`http://localhost:8100/book/orders/${orderId}/capture`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to capture payment');
                }

                const data = await response.json();
                console.log('Capture Response:', data);

                navigate('/payment-success'); 
            } catch (error) {
                console.error('Error capturing payment:', error);
                alert('Payment failed!');
            }
        };

        capturePayment();
    }, [location, navigate]);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Completing Payment...</h2>
                <p className="text-gray-600">Please wait while we process your payment.</p>
            </div>
        </div>
    );
};

export default PaymentGateway;
