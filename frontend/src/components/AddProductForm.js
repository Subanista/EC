import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = ({ onProductAdded }) => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    trending: false,
    discount: 0,
    image: null,
    tags : [],
  });
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setProductData({ ...productData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append all fields to FormData
    Object.entries(productData).forEach(([key, value]) => {
      if (key === 'tags') {
        formData.append(key, JSON.stringify(tags)); // Handle tags as a JSON string
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await axios.post('/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // If onProductAdded is passed as a prop, invoke it to update the product list
      if (onProductAdded) {
        onProductAdded(response.data);
      }

      // Reset form
      setProductData({
        name: '',
        price: '',
        description: '',
        category: '',
        stock: '',
        trending: false,
        discount: 0,
        image: null,
        tags:[],
      });

      setTags([]);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error adding product. Please try again.');
      console.error('Error adding product:', error);
    }
  };


  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };


  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block font-semibold">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={productData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded w-full p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block font-semibold">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={productData.price}
          onChange={handleChange}
          className="border border-gray-300 rounded w-full p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block font-semibold">Description</label>
        <textarea
          id="description"
          name="description"
          value={productData.description}
          onChange={handleChange}
          className="border border-gray-300 rounded w-full p-2"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block font-semibold">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={productData.category}
          onChange={handleChange}
          className="border border-gray-300 rounded w-full p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="stock" className="block font-semibold">Stock</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={productData.stock}
          onChange={handleChange}
          className="border border-gray-300 rounded w-full p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="trending" className="block font-semibold">Trending</label>
        <input
          type="checkbox"
          id="trending"
          name="trending"
          checked={productData.trending}
          onChange={handleChange}
          className="mr-2"
        />
        Mark as trending
      </div>

      <div className="mb-4">
        <label htmlFor="discount" className="block font-semibold">Discount (%)</label>
        <input
          type="number"
          id="discount"
          name="discount"
          value={productData.discount}
          onChange={handleChange}
          className="border border-gray-300 rounded w-full p-2"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="image" className="block font-semibold">Product Image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="border border-gray-300 rounded w-full p-2"
          required
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='tags' className="block font-semibold" >Tags </label>
        <div>
          {tags.map((tag, index) => (
            <span key={index} style={{ marginRight: '5px' }}>
              {tag} <button type="button" onClick={() => handleRemoveTag(index)}>x</button>
            </span>
          ))}
        </div>
        <input
          type="text"
          id='tags'
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="Enter a tag"
        />
        <button type="button" onClick={handleAddTag}>Add Tag</button>
      </div>
      {errorMessage && (
        <div className="text-red-500 mb-4">{errorMessage}</div>
      )}

      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
