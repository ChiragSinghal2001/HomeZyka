import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function MealDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { meals, getCookById } = useApp();
  
  // States for flow control
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState('Book');
  const [portionCount, setPortionCount] = useState(1);
  const [selectedTime, setSelectedTime] = useState('Today, 12:30');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Form States
  const [customerDetails, setCustomerDetails] = useState({
    fullName: '',
    phone: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  const meal = meals.find(m => m.id === id);
  const cook = meal ? getCookById(meal.cookId) : null;

  if (!meal) return <div className="pt-32 text-center font-display text-2xl text-dark">Meal not found</div>;

  const validateForm = () => {
    const newErrors = {};
    if (!customerDetails.fullName.trim() || customerDetails.fullName.length < 2) {
      newErrors.fullName = 'Please enter a valid name (min 2 chars)';
    }
    if (!customerDetails.phone || !/^[0-9]{10}$/.test(customerDetails.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFinalConfirm = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    // Here you would typically save the order to your context/database
    alert(`Order for ${meal.title} placed successfully!`);
    navigate('/my-orders');
  };

  // If showConfirm is true, render the Booking Form instead of Meal Details
  if (showConfirm) {
    return (
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 xl:px-[7vw] bg-[#F9F8F4] min-h-screen">
        <div className="max-w-2xl mx-auto bg-white rounded-[3rem] p-8 sm:p-12 shadow-2xl border border-dark/5 animate-in fade-in zoom-in-95 duration-500">
          <button 
            onClick={() => setShowConfirm(false)} 
            className="flex items-center gap-2 text-gray-text hover:text-dark mb-8 transition-colors text-sm font-medium"
          >
            <i className="fas fa-arrow-left"></i> Back to details
          </button>

          <div className="text-center mb-10">
            <h1 className="font-display text-4xl text-dark mb-3">Confirm Booking</h1>
            <p className="text-gray-text">Finalize your order for <span className="text-dark font-bold">{meal.title}</span></p>
          </div>

          <form onSubmit={handleFinalConfirm} className="space-y-6" noValidate>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-dark px-1">Full Name <span className="text-tomato">*</span></label>
              <div className="relative">
                <i className="fas fa-user absolute left-5 top-1/2 -translate-y-1/2 text-gray-text"></i>
                <input 
                  type="text" 
                  placeholder="Enter your name"
                  className={`w-full pl-14 pr-6 py-4 rounded-2xl bg-warm-white/50 border outline-none transition-all ${
                    errors.fullName ? 'border-tomato/50 focus:border-tomato focus:ring-1 focus:ring-tomato/20' : 'border-transparent focus:border-mustard focus:ring-2 focus:ring-mustard/20'
                  }`}
                  value={customerDetails.fullName}
                  onChange={(e) => {
                    setCustomerDetails({...customerDetails, fullName: e.target.value});
                    if (errors.fullName) setErrors({...errors, fullName: null});
                  }}
                />
              </div>
              {errors.fullName && <p className="text-xs text-tomato px-1">{errors.fullName}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-dark px-1">Phone Number <span className="text-tomato">*</span></label>
              <div className="relative">
                <i className="fas fa-phone absolute left-5 top-1/2 -translate-y-1/2 text-gray-text"></i>
                <input 
                  type="tel" 
                  maxLength="10"
                  placeholder="e.g. 9876543210"
                  className={`w-full pl-14 pr-6 py-4 rounded-2xl bg-warm-white/50 border outline-none transition-all ${
                    errors.phone ? 'border-tomato/50 focus:border-tomato focus:ring-1 focus:ring-tomato/20' : 'border-transparent focus:border-mustard focus:ring-2 focus:ring-mustard/20'
                  }`}
                  value={customerDetails.phone}
                  onChange={(e) => {
                    setCustomerDetails({...customerDetails, phone: e.target.value});
                    if (errors.phone) setErrors({...errors, phone: null});
                  }}
                />
              </div>
              {errors.phone && <p className="text-xs text-tomato px-1">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-dark px-1">Pickup Notes (Optional)</label>
              <textarea 
                placeholder="Any special instructions for the cook?"
                className="w-full p-6 rounded-2xl bg-warm-white/50 border-none focus:ring-2 focus:ring-mustard outline-none transition-all h-32 resize-none"
                value={customerDetails.notes}
                onChange={(e) => setCustomerDetails({...customerDetails, notes: e.target.value})}
              />
            </div>

            <div className="bg-warm-white/50 p-6 rounded-2xl flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-text uppercase font-bold tracking-widest">Total to pay</p>
                <p className="font-display text-3xl text-dark">₹{meal.price * portionCount}</p>
              </div>
              <div className="text-right text-sm text-gray-text">
                <p>{portionCount} Portion(s)</p>
                <p>{selectedTime}</p>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-mustard hover:bg-mustard/90 text-dark py-5 rounded-full font-bold text-xl transition-all shadow-md active:scale-95"
            >
              Confirm & Pay After Pickup <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 xl:px-[7vw] bg-[#F9F8F4] min-h-screen">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-text hover:text-dark mb-6 transition-colors text-sm font-medium"
      >
        <i className="fas fa-arrow-left"></i> Back
      </button>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* LEFT COLUMN: Media & Thumbnails */}
        <div className="space-y-4 lg:sticky lg:top-28">
          <div className="relative rounded-[2rem] overflow-hidden aspect-[16/10] shadow-sm">
            <img src={meal.images[currentImageIndex]} className="w-full h-full object-cover" alt={meal.title} />
            <button className="absolute top-5 right-5 w-10 h-10 bg-white rounded-full flex items-center justify-center text-dark shadow-md hover:scale-110 transition-transform">
              <i className="far fa-heart"></i>
            </button>
          </div>
          <div className="flex gap-3">
            {meal.images.map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${idx === currentImageIndex ? 'border-mustard' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Info & Interaction */}
        <div className="space-y-6">
          <header>
            <div className="flex items-center justify-between mb-1">
              <h1 className="font-display text-4xl text-dark">{meal.title}</h1>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Meal link copied to clipboard!');
                }}
                className="text-gray-text hover:text-dark"
                title="Share this meal"
              >
                <i className="fas fa-share-alt"></i>
              </button>
            </div>
            <div className="flex items-center gap-1.5 mb-6">
              <i className="fas fa-star text-mustard text-xs"></i>
              <span className="text-sm font-bold text-dark">{meal.rating}</span>
              <span className="text-gray-text text-sm">({meal.reviewCount} reviews)</span>
            </div>

            {/* Cook Banner */}
            <div className="bg-white p-4 rounded-2xl border border-dark/5 flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img src={cook?.avatar} className="w-12 h-12 rounded-full object-cover" alt="" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-dark text-sm">{cook?.name}</p>
                    <span className="bg-[#F3E8D6] text-[9px] px-2 py-0.5 rounded text-dark/60 font-bold uppercase tracking-tighter">Verified</span>
                  </div>
                  <p className="text-[11px] text-gray-text flex items-center gap-1">
                    <i className="fas fa-map-marker-alt opacity-40"></i> {meal.location}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => alert(`Messaging ${cook?.name} functionality coming soon!`)}
                className="px-4 py-2 rounded-full border border-dark/10 text-xs font-bold hover:bg-warm-white flex items-center gap-2"
              >
                <i className="far fa-comment-dots"></i> Message
              </button>
            </div>

            <p className="text-gray-text text-base leading-relaxed mb-8">
              {meal.description || "Complete vegetarian meal with dal, seasonal sabzi, 3 rotis, rice, salad, pickle, and a sweet. Perfect for a wholesome lunch."}
            </p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { label: 'Spice Level', val: 'Medium', icon: 'fa-fire-alt text-tomato' },
                { label: 'Portions Left', val: meal.portionsAvailable, icon: 'fa-user-friends text-basil' },
                { label: 'Pickup', val: 'Today', icon: 'fa-clock text-mustard' },
                { label: 'Fresh', val: 'Daily', icon: 'fa-check-double text-basil' }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-dark/5 text-left">
                  <i className={`fas ${stat.icon} mb-3 text-sm`}></i>
                  <p className="text-[9px] uppercase tracking-widest text-gray-text font-bold mb-0.5">{stat.label}</p>
                  <p className="text-sm font-bold text-dark">{stat.val}</p>
                </div>
              ))}
            </div>

            {/* Interactive Tabs Navigation */}
            <div className="flex gap-2 mb-8 bg-white p-1 rounded-full border border-dark/5">
              {['Book', 'Ingredients', 'Reviews'].map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 rounded-full text-sm font-bold transition-all ${activeTab === tab ? 'bg-dark text-white' : 'text-gray-text'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* TAB CONTENT AREA */}
            <div className="min-h-[300px]">
              {activeTab === 'Book' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div>
                    <p className="font-bold text-dark mb-4">Select pickup time</p>
                    <div className="flex gap-3">
                      {['Today, 12:30', 'Today, 19:00'].map(time => (
                        <button 
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`px-6 py-3 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${selectedTime === time ? 'border-mustard bg-mustard/5 text-dark' : 'bg-white text-gray-text border-dark/10'}`}
                        >
                          <i className="far fa-calendar-check"></i> {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-bold text-dark mb-4">Number of portions</p>
                    <div className="flex items-center gap-4 bg-white w-fit px-4 py-2 rounded-full border border-dark/10">
                      <button onClick={() => setPortionCount(Math.max(1, portionCount - 1))} className="w-8 h-8 rounded-full hover:bg-warm-white text-lg">-</button>
                      <span className="font-display text-2xl w-8 text-center">{portionCount}</span>
                      <button onClick={() => setPortionCount(Math.min(meal.portionsAvailable, portionCount + 1))} className="w-8 h-8 rounded-full hover:bg-warm-white text-lg">+</button>
                    </div>
                  </div>

                  {/* Summary Pricing Block */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-dark/5 shadow-xl">
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <p className="text-[10px] text-gray-text font-bold uppercase tracking-widest mb-1">Total Price</p>
                        <p className="font-display text-4xl text-dark">₹{meal.price * portionCount}</p>
                      </div>
                      <p className="text-xs text-gray-text line-through">₹{(meal.price + 20) * portionCount}</p>
                    </div>
                    <button 
                      onClick={() => setShowConfirm(true)}
                      className="w-full bg-mustard hover:bg-mustard/90 text-dark py-5 rounded-full font-bold text-lg shadow-md transition-transform active:scale-95"
                    >
                      Book Now
                    </button>
                    <p className="text-center text-[9px] text-gray-text font-bold uppercase tracking-widest mt-4">
                      Pay after confirmation • Free cancellation
                    </p>
                  </div>
                </div>
              )}

              {/* Ingredients & Reviews Tabs remain as they were in your code */}
              {activeTab === 'Ingredients' && (
                 <div className="bg-white p-8 rounded-[2rem] border border-dark/5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h3 className="font-display text-2xl mb-6">Ingredients</h3>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-12 mb-10">
                    {['Mixed lentils', 'Wheat flour', 'Ghee', 'Seasonal vegetables', 'Rice', 'Spices'].map(item => (
                      <div key={item} className="flex items-center gap-3 text-sm text-gray-text">
                        <div className="w-5 h-5 rounded-full bg-basil/10 flex items-center justify-center">
                          <i className="fas fa-check text-[10px] text-basil"></i>
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                  {/* Allergens ... */}
                </div>
              )}

              {activeTab === 'Reviews' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {/* Reviews Content ... */}
                </div>
              )}
            </div>
          </header>
        </div>
      </div>
    </main>
  );
}