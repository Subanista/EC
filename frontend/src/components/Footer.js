import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-stone-200  #444546 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Why we</h3>
            <p className="text-sm">
            Your trusted partner for quality, style, and an effortless shopping experience.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul>
              <li><Link to="/" className="text-sm hover:text-accent">Home</Link></li>
             
              <li><Link to="/login" className="text-sm hover:text-accent">Login</Link></li>
              
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
  <h3 className="text-lg font-bold mb-4">Follow Us</h3>
  <div className="flex space-x-4">
    {/* Facebook Icon */}
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-accent">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.9 2 1.99 2H12v-7h-3v-4h3V9c0-3.31 2.69-6 6-6h4v4h-2c-1.1 0-2 .9-2 2v2h4l-1 4h-3v7h5c1.1 0 1.99-.9 1.99-2L20 4c0-1.1-.9-2-2-2z"></path>
      </svg>
    </a>

    {/* Instagram Icon */}
    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-accent">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 2C4.79 2 3 3.79 3 6v12c0 2.21 1.79 4 4 4h10c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4H7zm0 2h10c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm5 3c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path>
      </svg>
    </a>

    {/* Twitter Icon */}
    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-accent">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22.46 6c-.77.35-1.6.58-2.46.69.89-.53 1.57-1.37 1.89-2.37-.83.5-1.75.86-2.72 1.05-.78-.83-1.89-1.34-3.11-1.34-2.35 0-4.26 1.91-4.26 4.26 0 .33.03.65.09.96-3.54-.18-6.7-1.87-8.8-4.43-.36.62-.57 1.34-.57 2.11 0 1.46.74 2.74 1.86 3.49-.68-.02-1.33-.21-1.9-.52v.05c0 2.03 1.44 3.73 3.35 4.12-.35.1-.73.16-1.11.16-.27 0-.53-.03-.79-.08.53 1.65 2.06 2.86 3.87 2.89-1.42 1.11-3.2 1.78-5.13 1.78-.33 0-.66-.02-.99-.06 1.81 1.16 3.97 1.84 6.28 1.84 7.53 0 11.65-6.24 11.65-11.65 0-.18 0-.36-.02-.54.8-.58 1.49-1.31 2.04-2.14z"></path>
      </svg>
    </a>
  </div>
</div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to get the latest updates and offers.</p>
            <div className="flex">
              <input type="email" className="p-2 w-full rounded-l-lg focus:outline-none" placeholder="Enter your email" />
              <button className="bg-black text-white p-2 rounded-r-lg hover:bg-accent-dark">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
