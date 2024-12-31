import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ProductsView from './ProductsView';
import { UserContext } from '../context/UserContext';

const Explore = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext); // Get user data from context

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
      } catch (err) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="w-55 bg-black text-white p-6">
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
        <ul>
          <li className="mb-4"><a href="/profile" className="hover:text-gray-400">Profile</a></li>
          <li className="mb-4"><a href="/cart" className="hover:text-gray-400">Cart</a></li>
          <li className="mb-4"><a href="/orders" className="hover:text-gray-400">Orders</a></li>
          <li className="mb-4"><a href="/settings" className="hover:text-gray-400">Settings</a></li>
        </ul>
      </div>

      <div className="flex-1 p-8">
        

        {user && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Hello, {user.name}!</h2>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">{user.cart?.length || 0} items in your cart</p>
          </div>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ProductsView products={products} />
        )}
      </div>
    </div>
  );
};

export default Explore;
