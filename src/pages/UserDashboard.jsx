import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const { currentUser, meals } = useApp();
  const [activeTab, setActiveTab] = useState('My Orders');

  // Mock orders for the dashboard view
  const userOrders = [
    { id: 'ORD-101', mealId: 'm1', status: 'Confirmed', price: 240, date: '2024-02-07' },
    { id: 'ORD-102', mealId: 'm2', status: 'Pending', price: 560, date: '2024-02-07' }
  ];

  const getMeal = (id) => meals.find(m => m.id === id);

  return (
    <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 xl:px-[7vw] bg-[#F9F8F4] min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 items-start">
        
        {/* LEFT SIDE: Profile Card (Matches your image exactly) */}
        <aside className="w-full lg:w-[400px] shrink-0">
          <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-dark/5 relative">
            {/* Profile Avatar Overlay */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2">
              <div className="relative">
                <img 
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1577214459173-bb3155160867?w=400'} 
                  className="w-32 h-32 rounded-full border-8 border-white object-cover shadow-lg" 
                  alt="Aman" 
                />
              </div>
            </div>

            <div className="pt-16 text-center lg:text-left">
              <div className="flex items-center justify-between mb-4">
                <h1 className="font-display text-4xl text-dark">{currentUser?.name || 'Aman'}</h1>
                <div className="w-8 h-8 bg-mustard rounded-full"></div>
              </div>

              <div className="flex justify-center lg:justify-start gap-2 mb-6">
                <span className="bg-[#FDF6E9] text-dark px-4 py-1.5 rounded-full text-xs font-bold">Home Cook</span>
                <span className="bg-[#E9F2E9] text-[#5A8D5A] px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                   Verified
                </span>
              </div>

              <p className="text-gray-text text-sm leading-relaxed mb-10 text-center lg:text-left">
                I cook the way I feed my family—fresh spices, honest portions, and a lot of care. Try my biryani on Fridays.
              </p>

              <div className="h-[1px] bg-dark/5 w-full mb-8"></div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="text-center border-r border-dark/5">
                  <p className="font-display text-2xl text-dark">4.9</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-text font-bold">Rating</p>
                </div>
                <div className="text-center border-r border-dark/5">
                  <p className="font-display text-2xl text-dark">120</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-text font-bold">Reviews</p>
                </div>
                <div className="text-center">
                  <p className="font-display text-2xl text-dark">2</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-text font-bold">Meals</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-5 mb-10">
                <div className="flex items-center gap-4 text-sm text-gray-text">
                  <i className="fas fa-map-marker-alt w-5 text-center"></i>
                  <span>Greenfield Colony, Block A</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-text">
                  <i className="fas fa-envelope w-5 text-center"></i>
                  <span>shabana@homezayka.in</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-text">
                  <i className="fas fa-phone-alt w-5 text-center"></i>
                  <span>+91-98765-43203</span>
                </div>
              </div>

              <button className="w-full border border-dark/10 py-4 rounded-full font-bold text-dark hover:bg-warm-white transition-all shadow-sm">
                Edit Profile
              </button>
            </div>
          </div>
        </aside>

        {/* RIGHT SIDE: Dashboard Content */}
        <div className="flex-1 space-y-8">
          <div className="flex gap-4">
            {['My Orders', 'Saved Meals', 'Activity'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                  activeTab === tab ? 'bg-dark text-white' : 'bg-white text-gray-text border border-dark/5 shadow-sm'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-dark/5 shadow-sm min-h-[500px]">
             <h2 className="font-display text-3xl mb-8">Current Activity</h2>
             
             {activeTab === 'My Orders' && (
               <div className="space-y-4">
                 {userOrders.map(order => {
                   const meal = getMeal(order.mealId);
                   return (
                     <div key={order.id} className="flex items-center justify-between p-5 bg-[#F9F8F4] rounded-3xl border border-dark/5">
                        <div className="flex items-center gap-4">
                           <img src={meal?.images[0]} className="w-14 h-14 rounded-2xl object-cover" alt="" />
                           <div>
                              <p className="font-bold text-dark">{meal?.title}</p>
                              <p className="text-xs text-gray-text">{order.date}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="font-display text-xl text-dark">₹{order.price}</p>
                           <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${
                             order.status === 'Confirmed' ? 'bg-basil/10 text-basil' : 'bg-mustard/10 text-mustard'
                           }`}>
                             {order.status}
                           </span>
                        </div>
                     </div>
                   );
                 })}
               </div>
             )}

             {activeTab !== 'My Orders' && (
               <div className="text-center py-20 text-gray-text italic">
                  No {activeTab.toLowerCase()} found.
               </div>
             )}
          </div>
        </div>

      </div>
    </main>
  );
}