const express = require('express');
const { processPayment } = require('../controllers/checkoutController');

const router = express.Router();

// POST: Process payment and create order
router.post('/payment', processPayment);

module.exports = router;
