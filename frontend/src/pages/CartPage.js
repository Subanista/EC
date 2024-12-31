import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import TrendingProducts from '../components/TrendingProducts';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  // Track quantities for each item
  const [quantities, setQuantities] = useState(
    cart.reduce((acc, item) => {
      acc[item._id] = 1; // Default quantity is 1 for each item
      return acc;
    }, {})
  );

  const handleQuantityChange = (item, quantity) => {
    if (quantity < 1) return; // Prevent negative or zero quantities
    setQuantities({ ...quantities, [item._id]: quantity });
  };

  // Calculate total amount for selected items
  const calculateTotal = () => {
    return selectedItems.reduce(
      (total, item) => total + item.price * quantities[item._id],
      0
    ).toFixed(2);
  };

  // Handle selecting items for checkout
  const handleSelectItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert('Please select items to checkout.');
    } else {
      // Pass selected items, their quantities, and total amount to payment page
      navigate('/payment', {
        state: { selectedItems, quantities, totalAmount: calculateTotal() },
      });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold  text-center " >Your Cart</h2>
      {cart.length > 0 ? (
        <div>
          <ul className="space-y-4 mt-4">
            {cart.map((item) => (
              <li
                key={item._id}
                className="p-4 border border-gray-300 rounded-md flex justify-between items-center"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-4"
                    onChange={() => handleSelectItem(item)}
                  />
                  <img
                    src={`http://localhost:5000/${item.image}`}
                    alt={item.name}
                    className="w-24 h-24 object-cover"
                  />
                  <div className="ml-4">
                    <span className="font-medium">{item.name}</span>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(item, quantities[item._id] - 1)
                        }
                        className="px-2 bg-gray-200 border border-gray-300 rounded-l-md"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={quantities[item._id]}
                        onChange={(e) =>
                          handleQuantityChange(item, parseInt(e.target.value, 10))
                        }
                        className="w-12 text-center border-t border-b border-gray-300"
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(item, quantities[item._id] + 1)
                        }
                        className="px-2 bg-gray-200 border border-gray-300 rounded-r-md"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <span className="font-medium text-gray-700">
                  ${item.price.toFixed(2)}
                </span>
                <button
                  className="bg-red-500 text-white p-2 rounded-md"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">
              Total: ${selectedItems.length > 0 ? calculateTotal() : '0.00'}
            </h3>
            <div className="flex space-x-4 mt-4">
              <button
                className="bg-red-500 text-white p-2 rounded-md"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-gray-500">Your cart is empty. Add Product</p>
      )}
      <section>
        <TrendingProducts />
      </section>
    </div>
  );
};

export default CartPage;
