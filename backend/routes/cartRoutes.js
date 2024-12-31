// cartRoutes.js
const express = require('express');
const { addToCart, getCart } = require('../controllers/cartController');
const router = express.Router();

router.post('/add', addToCart);
router.get('/:user', getCart);

module.exports = router;
