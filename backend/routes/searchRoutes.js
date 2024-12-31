const express = require('express');
const Product = require('../models/productModel'); // Adjust path as necessary
const router = express.Router();

// Search products by name, description, or tags
router.get('/api/products/search', async (req, res) => {
  try {
    const { query } = req.query;

    // Search by name, description, or tags
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } },
      ],
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error searching for products', error });
  }
});

module.exports = router;
