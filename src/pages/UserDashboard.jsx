import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import EditProfileModal from '../Components/EditProfileModal';
import ReviewModal from '../Components/ReviewModal';


export default function UserDashboard() {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('My Orders');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewOrder, setReviewOrder] = useState(null);

  // Track which orders have been reviewed
  const reviewedOrderIds = new Set(myReviews.map(r => (r.mealId?._id || r.mealId) + '-' + (r.cookId?._id || r.cookId)));

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('homezayka_token');
      if (!token || token === 'undefined') return;
      try {
        const res = await fetch('http://localhost:8080/api/orders/myorders', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          // Sort by newest first
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setOrders(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  // Fetch user's reviews for Activity tab and review button logic
  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem('homezayka_token');
      if (!token || token === 'undefined') return;
      try {
        const res = await fetch('http://localhost:8080/api/reviews/myreviews', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setMyReviews(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, [showReviewModal]);

  return (
    <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 xl:px-[7vw] bg-[#F9F8F4] min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 items-start">
        
        {/* LEFT SIDE: Profile Card */}
        <aside className="w-full lg:w-[400px] shrink-0">
          <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-dark/5 relative">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2">
              <div className="relative">
                <img 
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1577214459173-bb3155160867?w=400'} 
                  className="w-32 h-32 rounded-full border-8 border-white object-cover shadow-lg" 
                  alt={currentUser?.name} 
                />
              </div>
            </div>

            <div className="pt-16 text-center lg:text-left">
              <div className="flex items-center justify-between mb-4">
                <h1 className="font-display text-4xl text-dark">{currentUser?.name || 'Customer'}</h1>
                <div className="w-8 h-8 bg-mustard rounded-full"></div>
              </div>

              <div className="flex justify-center lg:justify-start gap-2 mb-6">
                <span className="bg-[#E9F2E9] text-[#5A8D5A] px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                   Foodie Member
                </span>
              </div>

              <p className="text-gray-text text-sm leading-relaxed mb-10 text-center lg:text-left">
                {currentUser?.bio || 'Passionate about good food and discovering new home-cooked meals.'}
              </p>

              <div className="h-[1px] bg-dark/5 w-full mb-8"></div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="text-center border-r border-dark/5">
                  <p className="font-display text-2xl text-dark">{orders.length}</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-text font-bold">Total Orders</p>
                </div>
                <div className="text-center">
                  <p className="font-display text-2xl text-dark">{orders.filter(o => o.status === 'completed' || o.status === 'confirmed').length}</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-text font-bold">Completed</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-5 mb-10">
                <div className="flex items-center gap-4 text-sm text-gray-text">
                  <i className="fas fa-map-marker-alt w-5 text-center"></i>
                  <span>{currentUser?.address || 'Address not provided'}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-text">
                  <i className="fas fa-envelope w-5 text-center"></i>
                  <span>{currentUser?.email || 'Email not provided'}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-text">
                  <i className="fas fa-phone-alt w-5 text-center"></i>
                  <span>{currentUser?.phone || 'Phone not provided'}</span>
                </div>
              </div>

              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="w-full border border-dark/10 py-4 rounded-full font-bold text-dark hover:bg-warm-white transition-all shadow-sm"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </aside>

        {/* RIGHT SIDE: Dashboard Content */}
        <div className="flex-1 space-y-8">
          <div className="flex gap-4">
            {['My Orders', 'Activity'].map(tab => (
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
             <h2 className="font-display text-3xl mb-8">
               {activeTab === 'Activity' ? 'My Reviews' : activeTab}
             </h2>
             

            {activeTab === 'My Orders' && (
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <p className="text-gray-text italic text-center py-10">You haven't placed any orders yet.</p>
                ) : (
                  orders.map(order => {
                    // Only allow review if order is completed/confirmed and not already reviewed
                    const isCompleted = order.status === 'completed' || order.status === 'confirmed';
                    const reviewKey = (order.mealId?._id || order.mealId) + '-' + (order.cookId?._id || order.cookId);
                    const alreadyReviewed = reviewedOrderIds.has(reviewKey);
                    return (
                      <div key={order._id} className="flex items-center justify-between p-5 bg-[#F9F8F4] rounded-3xl border border-dark/5">
                        <div className="flex items-center gap-4">
                          <img src={order.mealId?.images?.[0] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'} className="w-14 h-14 rounded-2xl object-cover" alt="" />
                          <div>
                            <p className="font-bold text-dark">{order.mealId?.title || 'Unknown Meal'}</p>
                            <p className="text-xs text-gray-text mt-1">Cook: {order.cookId?.name}</p>
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-end gap-2">
                          <p className="font-display text-xl text-dark">₹{order.totalPrice}</p>
                          <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full inline-block mt-1 ${
                            order.status === 'confirmed' || order.status === 'completed' ? 'bg-basil/10 text-basil' : 
                            order.status === 'cancelled' ? 'bg-tomato/10 text-tomato' :
                            'bg-dark/10 text-dark'
                          }`}>
                            {order.status === 'confirmed' ? 'completed' : order.status}
                          </span>
                          {isCompleted && !alreadyReviewed && (
                            <button
                              className="mt-2 px-4 py-2 rounded-full bg-mustard text-dark font-bold text-xs hover:bg-mustard/90 transition-all"
                              onClick={() => {
                                setReviewOrder(order);
                                setShowReviewModal(true);
                              }}
                            >
                              Give Review
                            </button>
                          )}
                          {isCompleted && alreadyReviewed && (
                            <span className="mt-2 px-4 py-2 rounded-full bg-basil/10 text-basil font-bold text-xs">Reviewed</span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}


            {activeTab === 'Activity' && (
              <div>
                {myReviews.length === 0 ? (
                  <div className="text-center py-20 text-gray-text italic">
                    You haven't written any reviews yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myReviews.map(review => (
                      <div key={review._id} className="bg-[#F9F8F4] p-6 rounded-2xl border border-dark/5 shadow-sm flex items-center gap-4">
                        <img src={review.mealId?.images?.[0] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'} className="w-14 h-14 rounded-2xl object-cover" alt="" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-dark">{review.mealId?.title || 'Meal'}</span>
                            <span className="text-xs text-gray-text">for <span className="font-medium">{review.cookId?.name}</span></span>
                          </div>
                          <div className="flex gap-1 text-mustard mb-1">
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className={`fas fa-star ${i < review.rating ? '' : 'opacity-30'}`}></i>
                            ))}
                          </div>
                          <p className="text-gray-text italic">"{review.text}"</p>
                        </div>
                        <span className="text-xs text-gray-text">{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}


          </div>
        </div>

      </div>
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        user={currentUser} 
      />
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => { setShowReviewModal(false); setReviewOrder(null); }}
        order={reviewOrder}
        onReviewSubmitted={() => {
          setShowReviewModal(false);
          setReviewOrder(null);
        }}
      />
    </main>
  );
}