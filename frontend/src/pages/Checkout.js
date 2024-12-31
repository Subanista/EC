import React, { useState } from 'react';

const Checkout = ({ selectedItems }) => {
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => total + item.price, 0);
  };

  const handlePayment = () => {
    console.log('Payment Successful');
    console.log('Delivery Address:', deliveryAddress);
    // Proceed to order creation
  };

  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        {selectedItems.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      <h3>Total: ${calculateTotal()}</h3>
      <form>
        <label>Delivery Address:</label>
        <input
          type="text"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
        />
        <button type="button" onClick={handlePayment}>
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Checkout;
