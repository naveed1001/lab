import React, { useState } from 'react';
import axios from 'axios';

const PaymentPage = () => {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post('http://localhost:8100/book/orders', {
                items: [
                    {
                        name: 'React Course',
                        description: 'Learn React from scratch',
                        quantity: 1,
                        unit_amount: {
                            currency_code: 'USD',
                            value: '50.00',
                        },
                    },
                ],
                currency_code: 'USD',
                total: '50.00',
                return_url: 'http://localhost:3000/payment-success',
                cancel_url: 'http://localhost:3000/payment-cancel',
            });
            console.log('Server Response:', data); 
            if (data.approvalUrl) {
                window.location.href = data.approvalUrl;
            } else {
                alert('Failed to get approval URL.');
            }
        } catch (error) {
            console.error('Error initiating payment:', error.response || error);
            alert('Error initiating payment.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-10">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    PayPal Payment
                </h1>
                <p className="text-gray-600 text-center mb-8">
                    Securely pay for your course using PayPal.
                </p>
                <div className="flex justify-center">
                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className={`px-6 py-3 font-semibold rounded-lg text-white ${
                            loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                        } transition duration-200`}
                    >
                        {loading ? 'Processing...' : 'Pay with PayPal'}
                    </button>
                </div>
                <div className="mt-6 text-sm text-gray-500 text-center">
                    By proceeding, you agree to our{' '}
                    <a
                        href="/terms"
                        className="text-blue-600 hover:underline"
                    >
                        Terms & Conditions
                    </a>{' '}
                    and{' '}
                    <a
                        href="/privacy"
                        className="text-blue-600 hover:underline"
                    >
                        Privacy Policy
                    </a>.
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
