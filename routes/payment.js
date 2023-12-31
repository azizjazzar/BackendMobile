const express = require('express');
const router = express.Router();

const {
    createPaymentIntent

} = require('../controllers/paymentCrud');

router.post('/addpayment', createPaymentIntent);
router.post('/confirmpayment', confirmPayment);


module.exports = router;
