const Order = require('../models/orderModel');
const Cart = require('../models/CartModel');

exports.processPayment = async (req, res) => {
  const { selectedItems, deliveryAddress, totalAmount, cardDetails, userId } = req.body;

  try {
    // Validate input
    if (!selectedItems || !deliveryAddress || !totalAmount || !cardDetails) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new order
    const order = new Order({
      user: userId,
      items: selectedItems.map(item => ({
        product: item.productId,
        quantity: item.quantity,
      })),
      deliveryAddress,
      totalAmount,
      paymentStatus: 'Paid', // Simulated payment
    });

    await order.save();

    // Clear cart after successful payment
    await Cart.findOneAndUpdate({ user: userId }, { items: [] });

    res.status(200).json({ message: 'Payment successful. Order placed.', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Payment processing failed.', error });
  }
};
