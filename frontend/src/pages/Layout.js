import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-55 bg-black text-white p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">Dashboard</h2>
        <ul>
          <li className="mb-4"><Link to="/profile" className="hover:text-gray-400">Profile</Link></li>
          <li className="mb-4"><Link to="/cart" className="hover:text-gray-400">Cart</Link></li>
          <li className="mb-4"><Link to="/orders" className="hover:text-gray-400">Orders</Link></li>
          <li className="mb-4"><a href="/settings" className="hover:text-gray-400">Settings</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-8">{children}</div>
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default Layout;
