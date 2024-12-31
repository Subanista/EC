import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/admin/users');
            setUsers(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`/admin/users/${id}`);
            setUsers(users.filter((user) => user._id !== id));
            alert('User deleted successfully');
        } catch (err) {
            console.error('Error deleting user:', err);
            alert('Failed to delete user');
        }
    };

    if (loading) return <p>Loading users...</p>;

    return (
        <div className="manage-users p-5 bg-gray-100 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-4 text-blue-500">Manage Users</h2>
    <table className="table-auto w-full bg-white rounded-lg shadow-md">
        <thead>
            <tr className="bg-blue-100 text-blue-800">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Actions</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user) => (
                <tr key={user._id} className="text-gray-800 border-b">
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={() => deleteUser(user._id)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

    );
};

export default ManageUsers;
