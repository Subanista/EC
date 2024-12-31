import React, { useState } from 'react';

import axios from 'axios';
const Payment = () => {
    
      const [amount, setAmount] = useState('');
      const [cardDetails, setCardDetails] = useState('');
      const [message, setMessage] = useState('');
      const [loading, setLoading] = useState(false);
    
      const handlePayment = async () => {
        setLoading(true);
        setMessage('');
        try {
          const response = await axios.post('http://localhost:5000/api/payments', {
            amount,
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
          <h2 className="text-2xl font-semibold mb-4">Make a Payment</h2>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="text"
              placeholder="Enter card details"
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
      );
    };

export default Payment;
