import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    trending: false,
    image: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch product data on mount to pre-fill the form
  useEffect(() => {
    axios
      .get(`/update-product/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching product data');
        setLoading(false);
      });
  }, [id]);


  const fetchProductDetails = async (productId) => {
    try {
        const response = await fetch(`http://localhost:5000/products/${productId}`);
        const data = await response.json();
        console.log(data);
        // Set product data to state here
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
};
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setProduct((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('discount', product.discount);
    formData.append('trending', product.trending);
    if (product.image) formData.append('image', product.image);

    try {
      await axios.put(`/api/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate.push('/manage-products'); // Redirect after successful update
    } catch (err) {
      setError('Error updating product');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Discount</label>
          <input
            type="number"
            name="discount"
            value={product.discount}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Trending</label>
          <input
            type="checkbox"
            name="trending"
            checked={product.trending}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Image</label>
          <input type="file" onChange={handleImageChange} />
        </div>

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
