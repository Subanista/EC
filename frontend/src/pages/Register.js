import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', formData);
            alert("Registration Successful");
            navigate('/login'); // Redirect to Login page
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#4e4e4e] to-[#e4eaec]">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6 text-black-700">Create Your Account</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-200"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-200"
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
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-200"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-gray-500 text-white py-2 rounded-md text-lg font-semibold transition duration-300"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-500">
                    Already have an account?{' '}
                    <a href="/login" className="text-primary hover:underline">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
