const router = require('express').Router();

const { Createappoint} = require('../Controllers/Bookappoint');
const {createOrder,capturePayment} = require('../Controllers/Paypal');

router.post('/createbook', Createappoint );

router.post('/orders', createOrder);

router.post('/orders/:orderId/capture', capturePayment);

module.exports = router;

