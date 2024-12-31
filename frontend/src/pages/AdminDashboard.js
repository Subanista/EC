import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

import Products from './Products';
import Orders from './Orders';
import ManageUsers from '../components/ManageUsers';


const AdminDashboard = () => {
  const navigate = useNavigate();

  // Function to handle sign out
  const signOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-200">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-md flex flex-col justify-between">
        {/* Sidebar Top Section */}
        <div>
          <div className="p-4 border-b border-gray-200 text-center">
            <h2 className="text-xl font-semibold text-gray-700">Admin Dashboard</h2>
          </div>
          <nav className="p-4">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/admin/users"
                  className="flex items-center p-3 rounded-md hover:bg-blue-100 hover:text-blue-600 text-gray-600 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a4 4 0 00-8 0m8 0a4 4 0 00-8 0m8 0v2m-8-2v2m12 10v-6a2 2 0 00-2-2h-4a2 2 0 00-2 2v6m-6 0v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6"
                    />
                  </svg>
                  Manage Users
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/products"
                  className="flex items-center p-3 rounded-md hover:bg-blue-100 hover:text-blue-600 text-gray-600 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h11M9 21V3m4 4h6m-6 4h6m-6 4h6"
                    />
                  </svg>
                  Manage Products
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/orders"
                  className="flex items-center p-3 rounded-md hover:bg-blue-100 hover:text-blue-600 text-gray-600 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v5a2 2 0 002 2h2a2 2 0 002-2v-5m-6 0h6m0-6V5a2 2 0 00-2-2H9a2 2 0 00-2 2v6m6 0h6m-6 0H3"
                    />
                  </svg>
                  Manage Orders
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Sidebar Bottom Section */}
        <div className="p-4">
          <button
            onClick={signOut}
            className="w-full flex items-center justify-center p-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-14V5"
              />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 bg-gray-50">
        <div className="bg-white shadow-md rounded-lg p-6">
          <Routes>
            <Route
              path="/admin"
              element={
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-800">Welcome to the Admin Panel</h1>
                  <p className="mt-4 text-gray-500">
                    Use the menu on the left to manage users, products, and orders.
                  </p>
                </div>
              }
            />
            <Route path="users" element={<ManageUsers />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
