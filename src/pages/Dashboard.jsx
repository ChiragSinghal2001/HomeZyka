// import { useApp } from '../context/AppContext';
// import MealCard from '../Components/MealCard';

// export default function Dashboard() {
//   const { meals, getCookById } = useApp();
  
//   // Filtering meals for the demo cook (Shabana - u1)
//   const myMeals = meals.filter(m => m.cookId === 'u1');

//   return (
//     <main className="px-4 sm:px-6 lg:px-8 xl:px-[7vw] py-12">
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
//         <div>
//           <h1 className="font-display text-4xl text-dark mb-1">Cook Dashboard</h1>
//           <p className="text-gray-text">Manage your meals and bookings</p>
//         </div>
//         <button className="bg-mustard hover:bg-mustard/90 text-dark px-6 py-3 rounded-full font-medium transition-all">
//           <i className="fas fa-plus mr-2"></i> Post New Meal
//         </button>
//       </div>

//       <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <div className="bg-white rounded-2xl p-6 border border-dark/10">
//           <p className="text-sm text-gray-text mb-1">Total Earnings</p>
//           <p className="font-display text-3xl text-dark">₹5,280</p>
//         </div>
//         <div className="bg-white rounded-2xl p-6 border border-dark/10">
//           <p className="text-sm text-gray-text mb-1">Active Meals</p>
//           <p className="font-display text-3xl text-dark">{myMeals.length}</p>
//         </div>
//       </div>

//       <h2 className="font-display text-2xl mb-6">My Active Meals</h2>
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {myMeals.map(meal => (
//           <MealCard key={meal.id} meal={meal} cook={getCookById(meal.cookId)} />
//         ))}
//       </div>
//     </main>
//   );
// }

import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import MealCard from '../Components/MealCard';
import AddMealModal from '../Components/AddMealModal';

export default function Dashboard() {
  const { meals, getCookById, currentUser } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  
  // Filtering meals for the logged in cook
  const myMeals = currentUser ? meals.filter(m => {
    const cid = m.cookId?._id || m.cookId?.id || m.cookId;
    const uid = currentUser._id || currentUser.id;
    return cid === uid;
  }) : [];

  const fetchOrders = async () => {
    const token = localStorage.getItem('homezayka_token');
    if (!token || token === 'undefined') return;
    try {
      const res = await fetch('http://localhost:8080/api/orders/myorders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('homezayka_token');
      const res = await fetch(`http://localhost:8080/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setOrders(orders.map(o => o._id === orderId ? { ...o, status } : o));
        alert(`Order successfully ${status}!`);
      } else {
        const errorData = await res.text();
        alert(`Failed to update order. Is the backend restarted? Server says: ${errorData}`);
      }
    } catch (err) {
      console.error(err);
      alert("Network error: Make sure the backend server is running.");
    }
  };

  const pendingOrders = orders.filter(o => o.status === 'pending');

  return (
    <main className="px-4 sm:px-6 lg:px-8 xl:px-[7vw] py-12 pt-28 bg-[#F9F8F4] min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-4xl text-dark mb-1">Cook Dashboard</h1>
          <p className="text-gray-text">Manage your meals and bookings</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-mustard hover:bg-mustard/90 text-dark px-6 py-3 rounded-full font-medium transition-all shadow-sm"
        >
          <i className="fas fa-plus mr-2"></i> Post New Meal
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-3xl p-6 border border-dark/5 shadow-sm">
          <p className="text-sm text-gray-text mb-1 uppercase font-bold tracking-widest text-[10px]">Total Earnings</p>
          <p className="font-display text-4xl text-dark mt-2">₹{orders.filter(o => o.status === 'completed' || o.status === 'confirmed').reduce((sum, o) => sum + o.totalPrice, 0)}</p>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-dark/5 shadow-sm">
          <p className="text-sm text-gray-text mb-1 uppercase font-bold tracking-widest text-[10px]">Active Meals</p>
          <p className="font-display text-4xl text-dark mt-2">{myMeals.length}</p>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-dark/5 shadow-sm">
          <p className="text-sm text-gray-text mb-1 uppercase font-bold tracking-widest text-[10px]">Pending Orders</p>
          <p className="font-display text-4xl text-mustard mt-2">{pendingOrders.length}</p>
        </div>
      </div>

      {pendingOrders.length > 0 && (
        <div className="mb-12">
          <h2 className="font-display text-2xl mb-6 text-dark flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-tomato animate-pulse"></span>
            Action Required: Pending Orders
          </h2>
          <div className="space-y-4">
            {pendingOrders.map(order => (
              <div key={order._id} className="bg-white p-6 rounded-[2rem] border border-mustard/30 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-6">
                  <img src={order.mealId?.images[0]} className="w-20 h-20 rounded-2xl object-cover" alt="" />
                  <div>
                    <h3 className="font-display text-xl text-dark mb-1">{order.mealId?.title}</h3>
                    <p className="text-sm text-gray-text mb-1">
                      <span className="font-bold text-dark">{order.customerId?.name}</span> wants {order.portions} portion(s)
                    </p>
                    <p className="text-xs text-gray-text"><i className="far fa-clock"></i> Pickup: {order.pickupTime?.startTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button 
                    onClick={() => handleUpdateOrderStatus(order._id, 'confirmed')}
                    className="flex-1 md:flex-none bg-basil/10 text-basil hover:bg-basil hover:text-white px-6 py-3 rounded-full font-bold text-sm transition-colors"
                  >
                    Accept
                  </button>
                  <button 
                    onClick={() => handleUpdateOrderStatus(order._id, 'cancelled')}
                    className="flex-1 md:flex-none bg-tomato/10 text-tomato hover:bg-tomato hover:text-white px-6 py-3 rounded-full font-bold text-sm transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="font-display text-2xl mb-6">My Published Meals</h2>
      {myMeals.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myMeals.map(meal => (
            <MealCard key={meal.id || meal._id} meal={meal} cook={getCookById(meal.cookId)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-[3rem] border border-dark/5">
          <p className="text-gray-text">You haven't published any meals yet.</p>
        </div>
      )}

      <AddMealModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}