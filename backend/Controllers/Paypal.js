const paypalModel = require('../Models/Paypal');

// Create order endpoint
const createOrder = async (req, res) => {
    try {
      const paymentDetails = req.body;
      const order = await paypalModel.createOrder(paymentDetails);
      console.log("PayPal Order:", order);
      if (!order || !order.links) {
        throw new Error("PayPal order creation failed");
      }
      const approvalUrl = order.links.find((link) => link.rel === "approve").href;
      res.json({ approvalUrl });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Error creating PayPal order" });
    }
  };
  
// Capture payment endpoint
const capturePayment = async (req, res) => {
    try {
        const { orderId } = req.params; 
        const captureData = await paypalModel.capturePayment(orderId);

        res.json(captureData); 
    } catch (error) {
        console.error('Error capturing payment:', error);
        res.status(500).json({ error: 'Error capturing PayPal payment' });
    }
};

module.exports = { createOrder, capturePayment };
