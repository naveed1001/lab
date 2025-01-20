const axios = require('axios');

// Get PayPal access token
async function getAccessToken() {
    const response = await axios({
        url: process.env.PAYPAL_BASE_URL + '/v1/oauth2/token',
        method: 'post',
        data: 'grant_type=client_credentials',
        auth: {
            username: process.env.PAYPAL_ID,
            password: process.env.PAYPAL_SECRET,
        },
    });
    return response.data.access_token;
}

// Create order with PayPal
async function createOrder(paymentDetails) {
    const accessToken = await getAccessToken();

    const response = await axios({
        url: process.env.PAYPAL_BASE_URL + '/v2/checkout/orders',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        data: {
            intent: 'CAPTURE', 
            purchase_units: [
                {
                    items: paymentDetails.items,
                    amount: {
                        currency_code: 'USD',
                        value: paymentDetails.totalAmount,
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: paymentDetails.totalAmount,
                            },
                        },
                    },
                },
            ],
            application_context: {
                return_url: process.env.BASE_URL + '/payment-success',
                cancel_url: process.env.BASE_URL + '/book',
            },
        },
    });

    console.log("Create Order Response:", response.data);  

    return response.data;
}

// Capture the payment with the orderId
async function capturePayment(orderId) {
    const accessToken = await getAccessToken();

    const response = await axios({
        url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });

    console.log("Capture Payment Response:", response.data);  

    return response.data;
}


module.exports = { createOrder, capturePayment };
