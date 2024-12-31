const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/productModel');
const Cart = require('../models/CartModel')
const productController = require('../controllers/productController');
const mongoose = require('mongoose');

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const router = express.Router();

// POST route for adding a product
router.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, category, stock, discount, trending , tags } = req.body;
    const image = req.file ? req.file.path : '';

    if (!name || !price || !description || !category || !stock || !discount || !image || !trending || !tags) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      stock,
      trending,
      discount,
      image,
      tags,
    });
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error.message);
    res.status(500).json({ error: 'Error adding product' });
  }
});

// Route to get all products
router.get('/products', productController.getAllProducts);

// Route to get discounted products
router.get('/products/discounted', async (req, res) => {
  try {
    const discountedProducts = await Product.find({ discount: { $gt: 0 } });
    res.status(200).json(discountedProducts);
  } catch (error) {
    console.error('Error fetching discounted products:', error.message);
    res.status(500).json({ error: 'Error fetching discounted products' });
  }
});

// Route to get trending products
router.get('/products/trending', async (req, res) => {
  try {
    const trendingProducts = await Product.find({ trending: true });
    res.status(200).json(trendingProducts);
  } catch (error) {
    console.error('Error fetching trending products:', error.message);
    res.status(500).json({ error: 'Error fetching trending products' });
  }
});

// PUT route to update a product
router.put('/update-product/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, description, price, discount, trending } = req.body;
  const image = req.file ? req.file.path : null;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.discount = discount || product.discount;
    product.trending = trending === undefined ? product.trending : trending;
    if (image) product.image = image;

    await product.save();
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to delete a product
router.delete('/products/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

//cart add
router.post('/api/cart', async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cartItem = await Cart.create({ productId, quantity });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error });
  }
});


module.exports = router;
