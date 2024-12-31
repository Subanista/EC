import React from 'react';
import { useCart } from '../context/CartContext';



const MakeOrder = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div>
      <h1>Order Summary</h1>
      {cart.map((item, index) => (
        <div key={index}>
          <p>{item.name}</p>
          <button onClick={() => removeFromCart(item._id)}>Remove</button>
        </div>
      ))}
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default MakeOrder;
