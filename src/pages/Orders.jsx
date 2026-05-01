import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

import { API_URL } from '../config/api';
export default function Orders() {
  const { meals } = useApp();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('homezayka_token');
      if (!token) return;
      try {
        const res = await fetch(`${API_URL}/orders/myorders`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  const getMeal = (id) => meals.find(m => m.id === id || m._id === id);

  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-[7vw] py-12 bg-[#F9F8F4] min-h-screen pt-28">
      <h1 className="font-display text-4xl mb-8 text-dark">My Received Orders</h1>
      
      <div className="space-y-4 max-w-4xl">
        {orders.length > 0 ? orders.map(order => {
          const meal = order.mealId?._id ? order.mealId : getMeal(order.mealId);
          const customer = order.customerId;
          return (
            <div key={order._id || order.id} className="bg-white p-6 rounded-[2rem] border border-dark/10 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-6 w-full">
                <img src={meal?.images?.[0] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600'} className="w-24 h-24 rounded-2xl object-cover" alt={meal?.title} />
                <div className="flex-1">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${order.status === 'confirmed' ? 'bg-basil/10 text-basil' : 'bg-mustard/10 text-mustard'}`}>
                    {order.status}
                  </span>
                  <h3 className="font-display text-xl mt-2">{meal?.title}</h3>
                  <p className="text-xs text-gray-text mt-1 flex items-center gap-2">
                    <i className="far fa-calendar-alt"></i> Pickup: {order.pickupTime?.startTime}
                  </p>
                </div>
                <div className="border-l border-dark/10 pl-6 text-right">
                  <p className="text-[10px] uppercase font-bold text-gray-text tracking-wider">Customer</p>
                  <p className="font-bold text-sm mb-2">{customer?.name}</p>
                  
                  <p className="text-[10px] uppercase font-bold text-gray-text tracking-wider">Earnings</p>
                  <p className="font-display text-2xl text-dark">₹{order.totalPrice}</p>
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dark/5 shadow-sm">
            <h3 className="font-display text-2xl text-dark mb-2">No Orders Yet</h3>
            <p className="text-gray-text">When customers order your meals, they will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}