import React, { useState } from 'react';
import axios from 'axios';

const CheckoutAndPayment = ({ selectedItems = [] }) => {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [cardDetails, setCardDetails] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePayment = async () => {
    if (!deliveryAddress || !cardDetails) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post('http://localhost:5000/api/payment', {
        selectedItems,
        deliveryAddress,
        totalAmount: calculateTotal(),
        cardDetails,
        
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Payment failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Checkout and Payment</h2>
      {selectedItems.length > 0 ? (
        <div>
          <ul className="space-y-2">
            {selectedItems.map((item, index) => (
              <li key={index} className="p-2 border border-gray-300 rounded">
                {item.name} - ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>
          <h3 className="mt-4 text-lg font-medium">
            Total: ${calculateTotal().toFixed(2)}
          </h3>
          <div className="mt-4 space-y-2">
            <input
              type="text"
              placeholder="Delivery Address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="text"
              placeholder="Card Details"
              value={cardDetails}
              onChange={(e) => setCardDetails(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            />
            <button
              onClick={handlePayment}
              className={`bg-blue-500 text-white p-2 rounded w-full ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
            {message && <p className="mt-4 text-lg">{message}</p>}
          </div>
        </div>
      ) : (
        <p>Your cart is empty. Please add items to proceed.</p>
      )}
    </div>
  );
};

export default CheckoutAndPayment;
