import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext'; // Import UserContext

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { logIn } = useContext(UserContext); // Use logIn from UserContext
    const navigate = useNavigate();

    // Predefined admin credentials
    const adminEmail = 'admin@123.com';  // Set admin email
    const adminPassword = 'admin123'; // Set admin password

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the entered credentials match the admin credentials
        if (formData.email === adminEmail && formData.password === adminPassword) {
            // Redirect to Admin Dashboard if admin credentials match
            navigate('/admin/*');
        } else {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', response.data.token);
            // Save user data in context and localStorage
            const userData = { ...response.data.user, token: response.data.token };
            logIn(userData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/explore'); // Redirect to Explore page
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
        }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#4e4e4e] to-[#e4eaec]">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6 text-black-700">Welcome Back</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring--cyan-200"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring--cyan-200"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-gray-500 text-white py-2 rounded-md text-lg font-semibold transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-500">
                    Don't have an account?{' '}
                    <a href="/register" className="text-primary hover:underline">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
