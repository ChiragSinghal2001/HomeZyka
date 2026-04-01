import { useState } from 'react';
import { useApp } from '../context/AppContext';
import MealCard from '../Components/MealCard';

import { cuisines, categories, locations, dietaryOptions } from '../data/mockData';

export default function Browse() {
  const { meals, getCookById } = useApp();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    cuisine: 'All Cuisines',
    category: 'all',
    location: 'All Locations',
    sort: 'Recommended'
  });

  const filteredMeals = meals.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase()) || 
                          m.cuisine.toLowerCase().includes(search.toLowerCase());
    const matchesCuisine = filters.cuisine === 'All Cuisines' || m.cuisine === filters.cuisine;
    const matchesCategory = filters.category === 'all' || m.category === filters.category;
    const matchesLocation = filters.location === 'All Locations' || m.location === filters.location;
    return matchesSearch && matchesCuisine && matchesCategory && matchesLocation;
  });
  
  filteredMeals.sort((a, b) => {
    if (filters.sort === 'Price: Low to High') {
      return a.price - b.price;
    }
    if (filters.sort === 'Price: High to Low') {
      return b.price - a.price;
    }
    if (filters.sort === 'Highest Rated') {
      return b.rating - a.rating;
    }
    return 0; 
  });

  return (
    <main className="pt pb-16 px-4 sm:px-6 lg:px-8 xl:px-[7vw]">
      {/* Search Header */}
      <div className="mb-2">
        <h1 className="font-display text-4xl sm:text-5xl text-dark mb-2">Browse Meals</h1>
        <p className="text-gray-text text-lg">Discover home-cooked meals from talented cooks near you</p>
      </div>

      {/* Top Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
  {/* Search Input */}
  <div className="relative flex-1">
    <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-text text-sm"></i>
    <input 
      type="text" 
      placeholder="Search meals, cuisines, cooks..." 
      className="pl-14 pr-6 py-4 rounded-full bg-white border border-dark/10 w-full focus:outline-none focus:ring-2 focus:ring-mustard transition-all shadow-sm font-medium"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  {/* Styled Dropdown Container */}
  <div className="relative w-full sm:w-56">
    <select 
      className="w-full appearance-none rounded-full py-4 pl-6 pr-12 bg-white border border-dark/10 outline-none cursor-pointer font-medium text-dark shadow-sm hover:border-dark/20 transition-all"
      value={filters.sort}
      onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
    >
      <option value="Recommended">Recommended</option>
      <option value="Price: Low to High">Price: Low to High</option>
      <option value="Price: High to Low">Price: High to Low</option>
      <option value="Highest Rated">Highest Rated</option>
    </select>
    
    {/* Custom Chevron Arrow Overlay */}
    <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center text-dark">
      <i className="fas fa-chevron-down text-[10px] opacity-70"></i>
    </div>
  </div>
</div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-28 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl">Filters</h3>
              <button 
                onClick={() => setFilters({ cuisine: 'All Cuisines', category: 'all', location: 'All Locations' })}
                className="text-sm text-tomato hover:underline"
              >
                Clear all
              </button>
            </div>
            
            {/* Dynamic Cuisine Filter */}
            <div className="bg-white p-5 rounded-2xl border border-dark/5 shadow-sm">
              <h4 className="font-display text-lg mb-4">Cuisine</h4>
              <select 
                className="w-full rounded-xl py-3 px-4 bg-warm-white border border-dark/5 text-sm outline-none"
                value={filters.cuisine}
                onChange={(e) => setFilters({...filters, cuisine: e.target.value})}
              >
                {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Dynamic Category Filter */}
            <div className="bg-white p-5 rounded-2xl border border-dark/5 shadow-sm">
              <h4 className="font-display text-lg mb-4">Category</h4>
              <select 
                className="w-full rounded-xl py-3 px-4 bg-warm-white border border-dark/5 text-sm outline-none"
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
              >
                {categories.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
              </select>
            </div>

            {/* Dynamic Location Filter */}
            <div className="bg-white p-5 rounded-2xl border border-dark/5 shadow-sm">
              <h4 className="font-display text-lg mb-4">Location</h4>
              <select 
                className="w-full rounded-xl py-3 px-4 bg-warm-white border border-dark/5 text-sm outline-none"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
              >
                {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
          </div>
        </aside>

        {/* Results Grid */}
        <div className="flex-1">
          <div className="mb-6">
            <p className="text-gray-text">Showing <span className="font-bold text-dark">{filteredMeals.length}</span> meals</p>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMeals.map(meal => (
              <MealCard key={meal.id} meal={meal} cook={getCookById(meal.cookId)} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}