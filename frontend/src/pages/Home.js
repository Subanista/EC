import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import DiscountSlider from '../components/DiscountSlider';
import TrendingProducts from '../components/TrendingProducts';

const Home = () => {

  return (
    <div className="bg-background text-dark">
      {/* Discount Slider */}
      <DiscountSlider />


     
      {/* Welcome Section */}
      <section className="bg-gradient-to-r from-[#4e4e4e] to-[#e4eaec] text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">Welcome to Your Favorite E-Shop</h1>
        <p className="text-lg md:text-xl mb-6">
          Discover amazing deals, stylish products, and a seamless shopping experience.
          Whether you're a trendsetter or just looking for the perfect addition to your wardrobe, we've got you covered!
        </p>
        <a
          href="/login"
          className="bg-white text-[#474a4b] px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#cfd2d3] transition-all duration-300"
        >
          Start Shopping Now
        </a>
        <div className="mt-12">
          <h2 className="text-2xl font-bold">Why Shop With Us?</h2>
          <ul className="list-disc list-inside mt-4 text-lg">
            <li>Easy browsing and order placement</li>
            <li>Secure payment options</li>
            <li>Admin-controlled product management</li>
            <li>Exclusive discounts and offers</li>
          </ul>
        </div>
      </section>

      {/* Trending Products */}
      <section >
        
        <TrendingProducts/>
      </section>
      <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl  text-center text-gray-800 mb-6">
        Elevating <strong  > Shopping</strong>
        </h2>
        <p className="text-lg text-center text-gray-600 leading-relaxed max-w-3xl mx-auto">
        Your trusted partner in online shopping, where style meets convenience. We curate exceptional products to bring you quality, elegance, and an effortless shopping journey. Discover what sets us apart and elevate your shopping experience with every click.
        </p>
      </div>
    </section>
    </div>
  );
};

export default Home;
