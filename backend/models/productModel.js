const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  trending : {type :Boolean, default :false},
  discount: { type: Number, default: 0 }, // Discount percentage
  image: { type: String, required: true }, // URL to product image
  tags: [{ type: String }], // Array of tags
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
