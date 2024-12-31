import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/logo.png'
import axios from 'axios';
import { FaSignInAlt , FaHome, FaUser} from 'react-icons/fa'; // Import a login icon

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/products/search?query=${searchQuery}`);
      setSearchResults(response.data);

      // Navigate to a search results page and pass the data (optional)
      navigate('/search', { state: { results: response.data } });
    } catch (error) {
      console.error('Error during search:', error);
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <nav className="bg-primary text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-20" />
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center border-2 border-[#1b1b1b] rounded-full px-4 py-2 max-w-lg">
          <input
            type="text"
            className="w-full bg-transparent text-white placeholder-[#636464] focus:outline-none"
            placeholder="type here..."
            value={searchQuery}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="text-white ml-2" onClick={handleSearch}>
            search
          </button>
        </form>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-gray-300 flex items-center">
            <FaHome size={20} className="mr-2" /> {/* Home Icon */}
            <span className="sr-only">Home</span> {/* Screen reader support */}
          </Link>

          <Link to="/login" className="text-white hover:text-gray-300 flex items-center">
            <FaUser size={20} className="mr-2" /> {/* Icon */}
            <span className="sr-only">Login</span> {/* Screen reader support */}
          </Link>


        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center text-[#151616] hover:text-accent focus:outline-none"
          aria-label="Menu"
          onClick={() => document.getElementById('mobile-menu').classList.toggle('hidden')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-menu" className="hidden md:hidden bg-white text-[#1d1e1f]">
        <Link to="/" className="block px-4 py-2 hover:text-accent">
          Home
        </Link>
        
        <Link to="/login" className="block px-4 py-2 hover:text-accent">
          Login
        </Link>
        
      </div>
    </nav>
  );
};

export default Navbar;
