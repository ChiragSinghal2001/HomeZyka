import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

export default function Cooks() {
  const { users } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [sortBy, setSortBy] = useState('Highest Rated');

  const cooks = users.filter(u => u.role === 'cook');
  
  const filteredCooks = cooks.filter(cook => {
    const matchesSearch = cook.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (cook.address && cook.address.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLocation = locationFilter === 'All Locations' || (cook.address && cook.address.includes(locationFilter));
    return matchesSearch && matchesLocation;
  });

  const sortedCooks = [...filteredCooks].sort((a, b) => {
    if (sortBy === 'Highest Rated') return b.rating - a.rating;
    if (sortBy === 'Most Reviews') return b.reviewCount - a.reviewCount;
    return 0;
  });

  return (
    <main className="pt-24 pb-0">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-[7vw] mb-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl text-dark mb-4">Meet Our Home Cooks</h1>
          <p className="text-gray-text text-lg max-w-2xl mx-auto">Discover talented cooks in your neighborhood who pour their heart into every dish they make.</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-gray-text"></i>
            <input 
              type="text" 
              placeholder="Search cooks by name or location..." 
              className="w-full pl-14 pr-6 py-4 rounded-full bg-white border border-dark/5 shadow-sm focus:outline-none focus:ring-2 focus:ring-mustard/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <select 
            className="px-8 py-4 rounded-full bg-white border border-dark/5 shadow-sm focus:outline-none cursor-pointer text-dark/80"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option>All Locations</option>
            <option>Greenfield Colony</option>
            <option>Sunrise Apartments</option>
            <option>Old Market Lane</option>
          </select>

          <select 
            className="px-8 py-4 rounded-full bg-white border border-dark/5 shadow-sm focus:outline-none cursor-pointer text-dark/80"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>Highest Rated</option>
            <option>Most Reviews</option>
          </select>
        </div>

        <div className="mb-8">
          <p className="text-gray-text">Showing <span className="font-bold text-dark">{sortedCooks.length}</span> cooks</p>
        </div>

        {/* Dynamic Cooks Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-24">
          {sortedCooks.map(cook => (
            <Link 
              to={`/cooks/${cook.id}`} 
              key={cook.id} 
              className="bg-white rounded-[2rem] overflow-hidden border border-dark/5 hover:shadow-xl transition-all group"
            >
              <div className="relative h-32 bg-gradient-to-br from-mustard/20 to-coffee/10">
                <div className="absolute -bottom-10 left-6">
                  <img src={cook.avatar} alt={cook.name} className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg" />
                </div>
              </div>
              <div className="pt-12 pb-6 px-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-xl text-dark group-hover:text-mustard transition-colors">{cook.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <i className="fas fa-hat-chef text-gray-text text-sm"></i>
                      <span className="text-sm text-gray-text">Home Cook</span>
                    </div>
                  </div>
                  {cook.isVerified && (
                    <span className="bg-mustard/20 text-dark text-[10px] px-2 py-1 rounded-full font-medium">
                      <i className="fas fa-award mr-1"></i>Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-4 text-sm">
                  <span className="flex items-center gap-1 text-dark">
                    <i className="fas fa-star text-mustard"></i>
                    <span className="font-medium">{cook.rating}</span>
                  </span>
                  <span className="text-gray-text">({cook.reviewCount} reviews)</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Become a Cook CTA Section */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 xl:px-[7vw]">
        <div className="card-coffee rounded-[2.5rem] p-8 sm:p-12 overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-5xl text-white mb-4">Are you a home cook?</h2>
              <p className="text-white/80 text-lg mb-8">
                Join our community of home cooks and start earning by sharing your delicious meals with neighbors.
              </p>
              <Link 
                to="/become-cook" 
                className="bg-mustard hover:bg-mustard/90 text-dark px-8 py-4 rounded-full font-bold inline-flex items-center gap-2 transition-all"
              >
                Become a Cook <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-inner hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop" 
                alt="Home cooking" 
                className="w-full h-64 object-cover" 
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}