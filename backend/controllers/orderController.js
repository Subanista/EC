// orderController.js
const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  try {
    const { selectedItems, deliveryAddress, totalAmount, user } = req.body;

    const order = new Order({
      selectedItems,
      deliveryAddress,
      totalAmount,
      user,
    });
    await order.save();

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Order creation failed', error });
  }
};