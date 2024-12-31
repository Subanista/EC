const Product = require('../models/productModel.js'); // Adjust the path if necessary

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get discounted products
exports.getDiscountedProducts = async (req, res) => {
  try {
    // Fetch products where discount is greater than 0
    const discountedProducts = await Product.find({ discount: { $gt: 0 } });
    res.json(discountedProducts);
  } catch (error) {
    console.error('Error fetching discounted products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  const { name, price, description, trending, category, stock, discount } = req.body;
  const image = req.file ? req.file.path : null;  // Assuming image is uploaded via multer

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      stock,
      trending,
      discount,
      image
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category, stock, discount } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product fields
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    product.stock = stock || product.stock;
    product.discount = discount !== undefined ? discount : product.discount;
    product.image = image || product.image;
    product.updatedAt = Date.now(); // Update the 'updatedAt' field

    await product.save();
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.remove();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
