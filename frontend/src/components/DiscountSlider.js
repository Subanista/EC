import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

const DiscountSlider = () => {
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDiscountedProducts = async () => {
      try {
        const response = await axios.get('/products/discounted');
        if (response.status === 200) {
          setDiscountedProducts(response.data);
        } else {
          setError('Failed to fetch discounted products.');
        }
      } catch (err) {
        console.error('Error fetching discounted products:', err);
        setError('An error occurred. Please try again later.');
      }
    };

    fetchDiscountedProducts();
  }, []);

  return (
    <section className="my-4">
      <h2 className="text-2xl font-bold text-center mb-4">Hot Discounts</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={3}
        className="w-72 md:w-3/4 mx-auto"
      >
        {discountedProducts.length > 0 ? (
          discountedProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="bg-white shadow-md rounded overflow-hidden">
                <img
                  src={`http://localhost:5000/${product.image}`}
                  alt={product.name}
                  className="w-72 h-72 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-secondary text-xl">
                    ${product.price - (product.price * product.discount) / 100}
                  </p>
                  <p className="text-red-500">{product.discount}% OFF</p>
                  
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          !error && <p className="text-center">No discounted products available.</p>
        )}
      </Swiper>
    </section>
  );
};

export default DiscountSlider;
