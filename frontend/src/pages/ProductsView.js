import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from '../context/CartContext';

const ProductsView = () => {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState('grid'); // 'grid' or 'list'
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();

  // Fetch all products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleBuyNow = (product) => {
    navigate('/payment');
  };

  return (
    <section className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <div>
          <button
            onClick={() => setView('grid')}
            className={`px-4 py-2 rounded-l ${view === 'grid' ? 'bg-black text-white' : 'bg-gray-300'}`}
          >
            Grid View
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded-r ${view === 'list' ? 'bg-black text-white' : 'bg-gray-300'}`}
          >
            List View
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg shadow-lg p-4 bg-white"
              >
                <img
                  src={`http://localhost:5000/${product.image}`}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="font-bold text-xl text-green-500">${product.price}</p>
                <p className="text-sm text-gray-500">
                  {product.stock > 0 ? `Available: ${product.stock}` : "Out of Stock"}
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="bg-black text-white px-4 py-2 rounded-md"
                    disabled={product.stock <= 0}
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-black text-white px-4 py-2 rounded-md"
                    disabled={product.stock <= 0}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No products available.</p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg shadow-lg p-4 bg-white flex items-center"
              >
                <img
                  src={`http://localhost:5000/${product.image}`}
                  alt={product.name}
                  className="w-24 h-24 object-cover mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="font-bold text-xl text-green-500">${product.price}</p>
                  <p className="text-sm text-gray-500">
                    {product.stock > 0 ? `Available: ${product.stock}` : "Out of Stock"}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="bg-black text-white px-4 py-2 rounded-md"
                    disabled={product.stock <= 0}
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-black text-white px-4 py-2 rounded-md"
                    disabled={product.stock <= 0}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No products available.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default ProductsView;
