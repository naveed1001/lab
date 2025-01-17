const router = require('express').Router();

const { Createappoint} = require('../Controlers/Bookappoint');
const {createOrder,capturePayment} = require('../Controlers/Paypal');

router.post('/createbook', Createappoint );

router.post('/orders', createOrder);

router.post('/orders/:orderId/capture', capturePayment);

module.exports = router;

