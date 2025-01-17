const axios = require('axios');

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
                        currency_code: paymentDetails.currency_code,
                        value: paymentDetails.total,
                        breakdown: {
                            item_total: {
                                currency_code: paymentDetails.currency_code,
                                value: paymentDetails.total,
                            },
                        },
                    },
                },
            ],
            application_context: {
                return_url: paymentDetails.return_url,
                cancel_url: paymentDetails.cancel_url,
            },
        },
    });
    return response.data;
}

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
    return response.data;
}

module.exports = { createOrder, capturePayment };
