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

import { API_URL } from '../config/api';
export default function Dashboard() {
  const { meals, getCookById, currentUser } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [cookReviews, setCookReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [cookStats, setCookStats] = useState({ rating: 0, reviewCount: 0 });
  
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
      const res = await fetch(`${API_URL}/orders/myorders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCookReviews = async () => {
    if (!currentUser) {
      console.log('No current user, skipping reviews fetch');
      return;
    }
    setLoadingReviews(true);
    try {
      const cookId = currentUser._id || currentUser.id;
      console.log('Fetching reviews for cook ID:', cookId);
      const res = await fetch(`${API_URL}/reviews/cook/${cookId}`);
      const data = await res.json();
      console.log('Reviews API response:', data);
      if (res.ok) {
        setCookReviews(data);
        // Calculate average rating
        const avgRating = data.length > 0 
          ? (data.reduce((sum, review) => sum + review.rating, 0) / data.length).toFixed(1)
          : 0;
        setCookStats({
          rating: avgRating,
          reviewCount: data.length
        });
        console.log('Updated cook stats:', { rating: avgRating, reviewCount: data.length });
      } else {
        console.error('Failed to fetch reviews:', res.status, data);
        setCookReviews([]);
        setCookStats({ rating: 0, reviewCount: 0 });
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setCookReviews([]);
      setCookStats({ rating: 0, reviewCount: 0 });
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    if (currentUser) {
      console.log('Current user found:', currentUser);
      fetchCookReviews();
    } else {
      console.log('No current user available');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('homezayka_token');
      const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
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
          <p className="text-sm text-gray-text mb-1 uppercase font-bold tracking-widest text-[10px]">Rating</p>
          <div className="flex items-center gap-2 mt-2">
            <p className="font-display text-4xl text-dark">{cookStats.rating || '0.0'}</p>
            <div className="flex gap-1 text-mustard">
              {[...Array(5)].map((_, i) => (
                <i key={i} className={`fas fa-star text-sm ${i < Math.round(cookStats.rating || 0) ? '' : 'opacity-30'}`}></i>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-dark/5 shadow-sm">
          <p className="text-sm text-gray-text mb-1 uppercase font-bold tracking-widest text-[10px]">Reviews</p>
          <p className="font-display text-4xl text-dark mt-2">{cookStats.reviewCount || 0}</p>
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {myMeals.map(meal => (
            <MealCard key={meal.id || meal._id} meal={meal} cook={getCookById(meal.cookId)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-[3rem] border border-dark/5 mb-12">
          <p className="text-gray-text">You haven't published any meals yet.</p>
        </div>
      )}

      {/* Reviews Section */}
      <div className="mb-12">
        <h2 className="font-display text-2xl mb-6 text-dark flex items-center gap-3">
          <i className="fas fa-star text-mustard"></i>
          Customer Reviews ({cookStats.reviewCount})
        </h2>
        {loadingReviews ? (
          <div className="text-center text-gray-text py-10 bg-white rounded-[3rem] border border-dark/5">
            <i className="fas fa-spinner fa-spin mr-2"></i> Loading reviews...
          </div>
        ) : cookReviews.length === 0 ? (
          <div className="text-center text-gray-text py-20 bg-white rounded-[3rem] border border-dark/5">
            <i className="fas fa-star text-4xl mb-4 opacity-20"></i>
            <p className="text-lg mb-2">No reviews yet</p>
            <p className="text-sm">Customers will see your reviews here once they start ordering your meals</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cookReviews.map(review => (
              <div key={review._id} className="bg-white p-6 rounded-[2rem] border border-dark/5 shadow-sm">
                <div className="flex items-start gap-4">
                  <img 
                    src={review.customerId?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'} 
                    className="w-12 h-12 rounded-full object-cover" 
                    alt={review.customerId?.name || 'User'} 
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-bold text-dark">{review.customerId?.name || 'Anonymous Customer'}</span>
                        <span className="text-sm text-gray-text ml-2">on <span className="font-medium">{review.mealId?.title || 'Meal'}</span></span>
                      </div>
                      <span className="text-xs text-gray-text">{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex gap-1 text-mustard mb-3">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fas fa-star ${i < review.rating ? '' : 'opacity-30'}`}></i>
                      ))}
                    </div>
                    <p className="text-gray-text italic leading-relaxed">"{review.text}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AddMealModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}