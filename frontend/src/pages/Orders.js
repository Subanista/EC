import React, { useEffect, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/admin/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data.orders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>
      {orders.length > 0 ? (
        <table className="w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6 text-left">Order ID</th>
              <th className="py-3 px-6 text-left">Customer</th>
              <th className="py-3 px-6 text-left">Total</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6">{order.id}</td>
                <td className="py-3 px-6">{order.customerName}</td>
                <td className="py-3 px-6">${order.total.toFixed(2)}</td>
                <td className="py-3 px-6">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === 'Completed'
                        ? 'bg-green-200 text-green-800'
                        : order.status === 'Pending'
                        ? 'bg-yellow-200 text-yellow-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No orders available.</p>
      )}
    </div>
  );
};

export default Orders;
