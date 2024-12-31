import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const TrendingProducts =() =>{

 const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, addToCart } = useCart();

// Fetch trending products from the backend
useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/products/trending'); // Ensure this route returns products with trending: true
        setTrendingProducts(response.data);
      } catch (error) {
        console.error('Error fetching trending products:', error);
        setError('Failed to load trending products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

return(
<div>
    
      {/* Trending Products */}
      <section id="products" className="p-4">
        <h2 className="text-2xl font-bold mb-4  text-center ">Trending Products</h2>
        {loading ? (
          <p className="text-center text-lg">Loading trending products...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : trendingProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendingProducts.map((product) => (
              <div key={product._id} className="bg-white shadow-md rounded overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-secondary text-xl">${product.price.toFixed(2)}</p>
                  <button className="bg-primary text-white px-4 py-2 rounded mt-2 w-full hover:bg-secondary"  onClick={() => addToCart(product)}  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">No trending products available at the moment.</p>
        )}
      </section>
</div>
);
};
export default TrendingProducts;