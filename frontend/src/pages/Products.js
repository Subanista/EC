import React, { useState, useEffect } from 'react';
import AddProductForm from '../components/AddProductForm';
import axios from 'axios';
import ManageProducts from '../components/ManageProducts';

const Products = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const toggleAddProductForm = () => {
    setShowAddProduct(!showAddProduct);
  };

  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Manage Products</h2>
        <button
          onClick={toggleAddProductForm}
          className="bg-black text-white p-2 rounded-md hover:bg-gray-600"
        >
          Add Product
        </button>
      </div>

      {showAddProduct && (
        <div className="mt-4 p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold">Add New Product</h3>
          <AddProductForm onProductAdded={handleProductAdded} />
        </div>
      )}
<ManageProducts />
      
    </div>
  );
};

export default Products;
