// import { useApp } from '../context/AppContext';

// export default function Orders() {
//   const { meals } = useApp();
  
//   // Mocking active orders for demonstration
//   const myOrders = [
//     { id: 'ord1', meal: meals[0], status: 'Confirmed', date: 'March 10, 2026' },
//     { id: 'ord2', meal: meals[2], status: 'Pending', date: 'March 11, 2026' }
//   ];

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 xl:px-[7vw] py-12">
//       <h1 className="text-4xl mb-8">My Orders</h1>
      
//       <div className="space-y-4">
//         {myOrders.map(order => (
//           <div key={order.id} className="bg-white p-6 rounded-2xl border border-dark/10 flex flex-col sm:flex-row justify-between items-center gap-4">
//             <div className="flex items-center gap-4">
//               <img src={order.meal.images[0]} className="w-20 h-20 rounded-xl object-cover" alt={order.meal.title} />
//               <div>
//                 <h3 className="font-display text-lg">{order.meal.title}</h3>
//                 <p className="text-sm text-gray-text">Pickup: {order.date}</p>
//               </div>
//             </div>
//             <div className="text-right">
//               <span className={`px-4 py-1 rounded-full text-xs font-bold ${order.status === 'Confirmed' ? 'bg-basil/10 text-basil' : 'bg-mustard/10 text-mustard'}`}>
//                 {order.status}
//               </span>
//               <p className="mt-2 font-display text-lg">₹{order.meal.price}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function MealDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { meals, getCookById } = useApp();
  
  const [portionCount, setPortionCount] = useState(1);
  const [selectedTime, setSelectedTime] = useState(null);

  const meal = meals.find(m => m.id === id);
  const cook = meal ? getCookById(meal.cookId) : null;

  if (!meal) return <div className="pt-32 text-center">Meal not found</div>;

  return (
    <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 xl:px-[7vw] bg-[#F9F8F4]">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-text hover:text-dark mb-8 transition-colors"
      >
        <i className="fas fa-arrow-left text-sm"></i> Back
      </button>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Side: Image Gallery */}
        <div className="space-y-4">
          <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-lg">
            <img src={meal.images[0]} className="w-full h-full object-cover" alt={meal.title} />
            <button className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-tomato shadow-md hover:scale-110 transition-transform">
              <i className="far fa-heart text-xl"></i>
            </button>
          </div>
          <div className="flex gap-4">
            {meal.images.slice(0, 2).map((img, idx) => (
              <div key={idx} className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-transparent hover:border-mustard cursor-pointer shadow-sm">
                <img src={img} className="w-full h-full object-cover" alt="" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Details & Booking */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="font-display text-5xl text-dark">{meal.title}</h1>
              <button className="w-10 h-10 rounded-full bg-white border border-dark/5 flex items-center justify-center text-gray-text hover:text-dark">
                <i className="fas fa-share-alt"></i>
              </button>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <i className="fas fa-star text-mustard"></i>
              <span className="font-bold text-dark">{meal.rating}</span>
              <span className="text-gray-text">({meal.reviewCount} reviews)</span>
            </div>

            {/* Cook Info Bar */}
            <div className="bg-white p-4 rounded-3xl border border-dark/5 flex items-center justify-between mb-8 shadow-sm">
              <div className="flex items-center gap-4">
                <img src={cook?.avatar} className="w-12 h-12 rounded-full object-cover" alt="" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-dark">{cook?.name}</p>
                    <span className="bg-mustard/10 text-[10px] px-2 py-0.5 rounded-full text-mustard font-bold uppercase">Verified</span>
                  </div>
                  <p className="text-xs text-gray-text flex items-center gap-1">
                    <i className="fas fa-map-marker-alt"></i> {meal.location}
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-dark/10 text-sm font-medium hover:bg-warm-white transition-all">
                <i className="far fa-comment-alt"></i> Message
              </button>
            </div>

            <p className="text-gray-text text-lg leading-relaxed mb-8">
              {meal.description}
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Spice Level', val: 'Medium', icon: 'fa-pepper-hot text-tomato' },
                { label: 'Portions Left', val: meal.portionsAvailable, icon: 'fa-user text-basil' },
                { label: 'Pickup', val: 'Today', icon: 'fa-clock text-mustard' },
                { label: 'Fresh', val: 'Daily', icon: 'fa-check-circle text-basil' }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-dark/5 shadow-sm">
                  <i className={`fas ${stat.icon} mb-2`}></i>
                  <p className="text-[10px] uppercase tracking-wider text-gray-text font-bold mb-1">{stat.label}</p>
                  <p className="font-bold text-dark">{stat.val}</p>
                </div>
              ))}
            </div>

            {/* Action Tabs */}
            <div className="flex gap-2 mb-8">
              {['Book', 'Ingredients', 'Reviews'].map((tab) => (
                <button key={tab} className={`flex-1 py-3 rounded-full text-sm font-bold transition-all ${tab === 'Book' ? 'bg-dark text-white' : 'bg-white text-gray-text border border-dark/5'}`}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Selection Logic */}
            <div className="space-y-6">
              <div>
                <p className="font-bold text-dark mb-4">Select pickup time</p>
                <div className="flex flex-wrap gap-3">
                  {['Today, 12:30', 'Today, 19:00'].map(time => (
                    <button 
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-6 py-3 rounded-2xl border flex items-center gap-2 text-sm font-medium transition-all ${selectedTime === time ? 'border-mustard bg-mustard/5 text-dark' : 'border-dark/10 text-gray-text bg-white'}`}
                    >
                      <i className="fas fa-calendar-alt text-xs"></i> {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-bold text-dark mb-4">Number of portions</p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-full border border-dark/10">
                    <button onClick={() => setPortionCount(Math.max(1, portionCount - 1))} className="w-8 h-8 rounded-full hover:bg-warm-white transition-all">-</button>
                    <span className="font-display text-xl w-4 text-center">{portionCount}</span>
                    <button onClick={() => setPortionCount(Math.min(meal.portionsAvailable, portionCount + 1))} className="w-8 h-8 rounded-full hover:bg-warm-white transition-all">+</button>
                  </div>
                </div>
              </div>

              {/* Final Booking Card */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-dark/5 shadow-xl">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-xs text-gray-text font-bold uppercase tracking-widest mb-1">Total Price</p>
                    <p className="font-display text-4xl text-dark">₹{meal.price * portionCount}</p>
                  </div>
                  <p className="text-xs text-gray-text line-through mb-1">₹{meal.price + 20}</p>
                </div>
                <button className="w-full bg-mustard hover:bg-mustard/90 text-dark py-5 rounded-full font-bold text-xl transition-all shadow-md active:scale-95">
                  Book Now
                </button>
                <p className="text-center text-[10px] text-gray-text mt-4">Pay after confirmation • Free cancellation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}