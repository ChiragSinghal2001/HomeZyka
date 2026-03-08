import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function MealDetail() {
  const { id } = useParams(); // Gets the 'id' from the URL (e.g., /meal/m1)
  const { getMealById, getCookById } = useApp(); // Accesses our global data
  const [portions, setPortions] = useState(1); // Manages the portion counter
  
  const meal = getMealById(id);
  const cook = meal ? getCookById(meal.cookId) : null;

  // Error handling if the meal ID doesn't exist
  if (!meal) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-3xl font-display mb-4">Meal not found</h2>
        <Link to="/browse" className="text-mustard hover:underline">Back to Browse</Link>
      </div>
    );
  }

  return (
    <main className="px-4 sm:px-6 lg:px-8 xl:px-[7vw] py-10">
      {/* Navigation Breadcrumb */}
      <Link to="/browse" className="flex items-center gap-2 text-gray-text hover:text-dark mb-8 transition-colors">
        <i className="fas fa-arrow-left"></i> Back to Browse
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Side: Meal Image */}
        <div className="rounded-[2rem] overflow-hidden h-[300px] sm:h-[450px] shadow-lg">
          <img 
            src={meal.images[0]} 
            alt={meal.title} 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Right Side: Details & Booking */}
        <div>
          <h1 className="text-4xl sm:text-5xl mb-4">{meal.title}</h1>
          
          <div className="flex items-center gap-4 mb-8 p-4 bg-white rounded-2xl border border-dark/10">
            <img 
              src={cook?.avatar} 
              className="w-14 h-14 rounded-full object-cover border-2 border-mustard/20" 
              alt={cook?.name} 
            />
            <div>
              <p className="font-medium text-lg">{cook?.name}</p>
              <div className="flex items-center gap-1 text-xs text-gray-text">
                <i className="fas fa-award text-mustard"></i>
                <span>Verified Home Cook • {cook?.rating} ★</span>
              </div>
            </div>
            <Link 
              to={`/cooks`} 
              className="ml-auto text-sm border border-dark/10 px-4 py-2 rounded-full hover:bg-warm-white transition-colors"
            >
              View Profile
            </Link>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-label text-gray-text mb-2">Description</h3>
              <p className="text-gray-text text-lg leading-relaxed">{meal.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-dark/10">
                <p className="text-xs text-gray-text uppercase tracking-wider">Cuisine</p>
                <p className="font-medium">{meal.cuisine}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-dark/10">
                <p className="text-xs text-gray-text uppercase tracking-wider">Spice Level</p>
                <p className="font-medium capitalize">{meal.spiceLevel}</p>
              </div>
            </div>

            {/* Booking Card */}
            <div className="bg-white p-8 rounded-[2rem] border border-dark/10 shadow-sm mt-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-sm text-gray-text">Total Price</p>
                  <span className="text-3xl font-display text-dark">₹{meal.price * portions}</span>
                </div>
                
                <div className="flex items-center gap-4 bg-warm-white p-2 rounded-full">
                  <button 
                    onClick={() => setPortions(Math.max(1, portions - 1))}
                    className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <i className="fas fa-minus text-xs"></i>
                  </button>
                  <span className="text-xl font-bold w-6 text-center">{portions}</span>
                  <button 
                    onClick={() => setPortions(Math.min(meal.portionsAvailable, portions + 1))}
                    className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <i className="fas fa-plus text-xs"></i>
                  </button>
                </div>
              </div>

              <button 
                onClick={() => alert('Booking functionality coming soon!')}
                className="w-full bg-mustard text-dark py-4 rounded-full font-bold text-lg hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Book {portions} Portion{portions > 1 ? 's' : ''}
              </button>
              <p className="text-center text-xs text-gray-text mt-4">
                <i className="fas fa-info-circle mr-1"></i> 
                Pay after the cook confirms your slot
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}