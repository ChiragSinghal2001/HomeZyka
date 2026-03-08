import { useApp } from '../context/AppContext';
import MealCard from '../Components/MealCard';

export default function Dashboard() {
  const { meals, getCookById } = useApp();
  
  // Filtering meals for the demo cook (Shabana - u1)
  const myMeals = meals.filter(m => m.cookId === 'u1');

  return (
    <main className="px-4 sm:px-6 lg:px-8 xl:px-[7vw] py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-4xl text-dark mb-1">Cook Dashboard</h1>
          <p className="text-gray-text">Manage your meals and bookings</p>
        </div>
        <button className="bg-mustard hover:bg-mustard/90 text-dark px-6 py-3 rounded-full font-medium transition-all">
          <i className="fas fa-plus mr-2"></i> Post New Meal
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-dark/10">
          <p className="text-sm text-gray-text mb-1">Total Earnings</p>
          <p className="font-display text-3xl text-dark">₹5,280</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-dark/10">
          <p className="text-sm text-gray-text mb-1">Active Meals</p>
          <p className="font-display text-3xl text-dark">{myMeals.length}</p>
        </div>
      </div>

      <h2 className="font-display text-2xl mb-6">My Active Meals</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myMeals.map(meal => (
          <MealCard key={meal.id} meal={meal} cook={getCookById(meal.cookId)} />
        ))}
      </div>
    </main>
  );
}