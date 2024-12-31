const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  deliveryAddress: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
