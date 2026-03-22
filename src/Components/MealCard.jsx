import { useNavigate } from 'react-router-dom';
export default function MealCard({ meal, cook }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/meal/${meal.id}`);
  };
  return (
    
    <div 
    onClick={handleCardClick}
    className="bg-white rounded-[2rem] overflow-hidden border border-dark/10 hover:shadow-xl transition-all group">
      <div className="relative h-56 overflow-hidden">
        <img src={meal.images[0]} alt={meal.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white/90 text-dark text-[10px] px-3 py-1 rounded-full">{meal.cuisine}</span>
          {meal.dietary?.includes('vegetarian') && (
            <span className="bg-basil text-white text-[10px] px-3 py-1 rounded-full">Veg</span>
          )}
        </div>
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
          <i className="fas fa-star text-mustard text-sm"></i>
          <span className="text-sm font-medium">{meal.rating}</span>
          <span className="text-xs text-gray-text">({meal.reviewCount || 0})</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl text-dark group-hover:text-mustard transition-colors">{meal.title}</h3>
        <p className="text-gray-text text-sm mt-2 line-clamp-2">{meal.description}</p>
        <div className="flex items-center gap-3 mt-4">
          <img src={cook?.avatar} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md" alt="" />
          <div>
            <p className="text-sm font-medium text-dark">{cook?.name}</p>
            <div className="flex items-center gap-1 text-xs text-gray-text">
              <i className="fas fa-map-marker-alt"></i> {meal.location}
            </div>
          </div>
          {cook?.isVerified && <span className="ml-auto bg-mustard/20 text-dark text-[10px] px-2 py-1 rounded-full">Verified</span>}
        </div>
        <div className="flex items-center justify-between mt-5 pt-5 border-t border-dark/10">
          <div>
            <span className="font-display text-2xl text-dark">₹{meal.price}</span>
            <span className="text-sm text-gray-text ml-1">/portion</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-text">
            <span className="flex items-center gap-1"><i className="fas fa-user"></i> {meal.portionsAvailable} left</span>
            <span className="flex items-center gap-1"><i className="fas fa-clock"></i> Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}