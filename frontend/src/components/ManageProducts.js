import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products for the admin panel
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

  // Handle product delete
  const handleDelete = async (productId) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this product?");
      if (confirmed) {
        await axios.delete(`http://localhost:5000/products/${productId}`);
        setProducts(products.filter((product) => product._id !== productId)); // Remove product from list
        alert("Product deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Handle product update (navigate to update page or modal)
  const handleUpdate = (productId) => {
    navigate(`/update-product/${productId}`);
  };

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Manage Products</h2>
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
                  onClick={() => handleUpdate(product)}
                  className="bg-black text-white px-4 py-2 rounded-md"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-gray-700 text-white px-4 py-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No products available.</p>
        )}
      </div>
    </section>
  );
};

export default ManageProducts;
