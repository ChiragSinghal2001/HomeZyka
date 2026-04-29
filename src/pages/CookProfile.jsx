import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import MealCard from '../Components/MealCard';
import EditProfileModal from '../Components/EditProfileModal';

export default function CookProfile() {
  const { id } = useParams();
  const { users, meals, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('Meals');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Find the cook from our data, or use currentUser if they are viewing their own profile
  const cook = (currentUser?.id === id) ? currentUser : users.find(u => u.id === id);
  const cookMeals = meals.filter(m => m.cookId === id);

  if (!cook) return <div className="pt-32 text-center">Cook not found</div>;

  return (
    <main className="min-h-screen bg-warm-white">
      {/* Dynamic Header/Banner Overlay */}
      <div className="h-64 bg-gradient-to-r from-[#D7B588] to-[#C1D2C1]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar: Cook Details Card */}
          <aside className="w-full lg:w-96 shrink-0">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm relative">
              {/* Profile Image with Ring */}
              <div className="absolute -top-16 left-8">
                <img 
                  src={cook.avatar} 
                  className="w-32 h-32 rounded-full border-8 border-white object-cover shadow-lg" 
                  alt={cook.name} 
                />
              </div>

              <div className="pt-16">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="font-display text-3xl text-dark">{cook.name}</h1>
                  <div className="w-8 h-8 bg-mustard rounded-full flex items-center justify-center">
                    <i className="fas fa-medal text-white text-xs"></i>
                  </div>
                </div>

                <div className="flex gap-2 mb-6">
                  <span className="bg-cream/50 text-dark px-3 py-1 rounded-full text-xs font-medium">Home Cook</span>
                  <span className="bg-basil/10 text-basil px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <i className="fas fa-check-circle"></i> Verified
                  </span>
                </div>

                <p className="text-gray-text text-sm leading-relaxed mb-8">
                  {cook.bio || "Specializing in authentic homemade flavors. Every dish is prepared with fresh ingredients and love."}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 py-6 border-y border-dark/5 mb-8">
                  <div className="text-center">
                    <p className="font-display text-xl text-dark">{cook.rating}</p>
                    <p className="text-[10px] uppercase text-gray-text tracking-widest">Rating</p>
                  </div>
                  <div className="text-center border-x border-dark/5">
                    <p className="font-display text-xl text-dark">{cook.reviewCount}</p>
                    <p className="text-[10px] uppercase text-gray-text tracking-widest">Reviews</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-xl text-dark">{cookMeals.length}</p>
                    <p className="text-[10px] uppercase text-gray-text tracking-widest">Meals</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-sm text-gray-text">
                    <i className="fas fa-map-marker-alt w-5 text-center"></i>
                    <span>{cook.address || 'Address not provided'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-text">
                    <i className="fas fa-envelope w-5 text-center"></i>
                    <span>{cook.email || 'Email not provided'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-text">
                    <i className="fas fa-phone w-5 text-center"></i>
                    <span>{cook.phone || 'Phone not provided'}</span>
                  </div>
                </div>

                {currentUser?.id === cook.id ? (
                  <button 
                    onClick={() => setIsEditModalOpen(true)}
                    className="w-full border border-dark/10 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-warm-white transition-all"
                  >
                    <i className="fas fa-edit"></i> Edit Profile
                  </button>
                ) : (
                  <button 
                    onClick={() => alert(`Messaging ${cook.name} functionality coming soon!`)}
                    className="w-full bg-mustard hover:bg-mustard/90 text-dark py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <i className="far fa-comment-dots"></i> Message {cook.name}
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content: Tabs */}
          <div className="flex-1">
            {/* Tab Navigation */}
            <div className="bg-white p-1 rounded-full inline-flex mb-8 shadow-sm">
              {['Meals', 'Reviews'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab ? 'bg-dark text-white' : 'text-gray-text hover:text-dark'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content Panels */}
            <div className="min-h-[400px]">
              {activeTab === 'Meals' && (
                <div>
                  <h2 className="font-display text-2xl mb-6">Meals by this cook</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {cookMeals.map(meal => (
                      <MealCard key={meal.id} meal={meal} cook={cook} />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Reviews' && (
                <div>
                  <h2 className="font-display text-2xl mb-6">Customer Reviews</h2>
                  <div className="space-y-4">
                    <div className="bg-white p-6 rounded-2xl border border-dark/5 shadow-sm">
                      <div className="flex items-center gap-4 mb-3">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" className="w-10 h-10 rounded-full" alt="Riya" />
                        <div>
                          <p className="font-bold text-sm">Riya</p>
                          <div className="flex text-mustard text-xs">
                            {[1,2,3,4,5].map(i => <i key={i} className="fas fa-star"></i>)}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-text italic">"Amazing food! Will definitely order again."</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        user={cook} 
      />
    </main>
  );
}