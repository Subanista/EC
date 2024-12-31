const Cart = require('../models/CartModel');

exports.addToCart = async (req, res) => {
  try {
    const { user, product, quantity } = req.body;
     // Convert user to ObjectId
    const userId = mongoose.Types.ObjectId(user);

    let cart = await Cart.findOne({ user : userId }) || new Cart({ user, items: [] });
    

    const item = cart.items.find((item) => item.product.toString() === product);
    if (item) {
      item.quantity += quantity; // Update quantity if the product exists in the cart
    } else {
      cart.items.push({ product, quantity }); // Add new product to the cart
    }

    await cart.save();
    res.status(200).json({ message: 'Added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Adding to cart failed', error });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { user } = req.params;

    const cart = await Cart.findOne({ user }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: 'Fetching cart failed', error });
  }
};
