import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

export default function MyOrders() {
  const { users, meals } = useApp();
  const [activeTab, setActiveTab] = useState('Active');

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('homezayka_token');
      if (!token) return;
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
    fetchOrders();
  }, []);

  // Helper functions to fetch related data from state (fallback if populate failed or using mock)
  const getMeal = (id) => meals.find(m => m.id === id || m._id === id);
  const getCook = (id) => users.find(u => u.id === id || u._id === id);

  // Logic to filter orders by the selected tab
  const filteredOrders = orders.filter(order => {
    const status = order.status.charAt(0).toUpperCase() + order.status.slice(1); // 'pending' -> 'Pending'
    if (activeTab === 'Active') {
      return status === 'Pending' || status === 'Confirmed';
    }
    return status === activeTab; 
  });

  // Dynamic styling for status badges
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return 'bg-mustard/10 text-mustard';
      case 'Confirmed': return 'bg-basil/10 text-basil';
      case 'Completed': return 'bg-dark/5 text-dark';
      case 'Cancelled': return 'bg-tomato/10 text-tomato';
      default: return 'bg-dark/5 text-dark';
    }
  };

  return (
    <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 xl:px-[7vw] bg-[#F9F8F4] min-h-screen">
      
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl sm:text-5xl text-dark mb-3">My Orders</h1>
        <p className="text-gray-text text-lg max-w-xl mx-auto">
          Track your home-cooked meal bookings here. Pay the cook after you pick up your meal.
        </p>
      </div>

      {/* Tabbed Navigation */}
      <div className="flex justify-center mb-10">
        <div className="bg-white p-1 rounded-full border border-dark/5 shadow-sm inline-flex">
          {['Active', 'Completed', 'Cancelled'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 sm:px-8 py-3 rounded-full text-sm font-bold transition-all ${
                activeTab === tab ? 'bg-dark text-white shadow-md' : 'text-gray-text hover:text-dark'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Container */}
      <div className="max-w-5xl mx-auto space-y-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => {
            const meal = order.mealId?._id ? order.mealId : getMeal(order.mealId);
            const cook = order.cookId?._id ? order.cookId : getCook(order.cookId);
            return (
              <div 
                key={order.id} 
                className="bg-white p-6 rounded-[2rem] border border-dark/5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-6"
              >
                {/* Meal Image & Status */}
                <div className="flex items-center gap-5 flex-1">
                  <div className="relative shrink-0">
                    <img 
                      src={meal?.images[0]} 
                      className="w-24 h-24 rounded-2xl object-cover shadow-sm" 
                      alt={meal?.title} 
                    />
                  </div>
                  <div>
                    <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full mb-2 inline-block ${getStatusStyle(order.status)}`}>
                      <i className="fas fa-circle text-[6px] mr-1.5 opacity-70"></i> {order.status}
                    </span>
                    <h2 className="font-display text-2xl text-dark leading-tight">{meal?.title}</h2>
                    <p className="text-xs text-gray-text mt-1">Order #{order.id} • {order.orderDate}</p>
                  </div>
                </div>

                {/* Cook & Pickup Info */}
                <div className="flex flex-wrap gap-8 md:gap-12 md:border-l border-dark/5 md:pl-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-text">Cook</p>
                    <div className="flex items-center gap-2">
                      <img src={cook?.avatar} className="w-6 h-6 rounded-full" alt="" />
                      <p className="text-sm font-medium text-dark">{cook?.name}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-text">Portions</p>
                    <p className="text-sm font-bold text-dark">{order.portions} {order.portions > 1 ? 'portions' : 'portion'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-text">Total Price</p>
                    <p className="font-display text-2xl text-dark">₹{order.totalPrice}</p>
                  </div>
                </div>
                
                <div className="md:ml-4">
                  <Link 
                    to={`/meal/${meal?._id || meal?.id}`}
                    className="block text-center px-6 py-3 rounded-full border border-dark/10 text-xs font-bold hover:bg-warm-white transition-colors"
                  >
                    View Meal
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          /* Empty State Illustration & Link */
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-dark/10">
            <div className="w-20 h-20 bg-warm-white rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-clipboard-list text-3xl text-gray-text/30"></i>
            </div>
            <h3 className="font-display text-2xl text-dark mb-2">No {activeTab} Orders</h3>
            <p className="text-gray-text mb-8 px-6">You haven't placed any orders in this category yet.</p>
            <Link 
              to="/browse" 
              className="bg-mustard text-dark px-10 py-4 rounded-full font-bold shadow-lg hover:bg-mustard/90 transition-all inline-block"
            >
              Browse Delicious Meals <i className="fas fa-arrow-right ml-2 text-sm"></i>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}