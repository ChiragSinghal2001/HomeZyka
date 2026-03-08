import React from 'react';
import { useApp } from '../context/AppContext';

export default function TopCooks() {
  const { users } = useApp();
  // Filter only the cooks featured in your image
  const topCooks = users.filter(u => u.role === 'cook').slice(0, 4);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 xl:px-[7vw] text-center">
      <h2 className="font-display text-3xl text-dark mb-10">Meet our top cooks</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {topCooks.map((cook) => (
          <div key={cook.id} className="bg-white rounded-[2rem] p-6 border border-dark/10 flex items-center gap-4 text-left shadow-sm">
            <img 
              src={cook.avatar} 
              className="w-16 h-16 rounded-full object-cover" 
              alt={cook.name} 
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-display text-xl text-dark truncate">{cook.name}</h3>
                <span className="bg-cream/50 text-[10px] px-2 py-0.5 rounded-full text-dark/70 font-medium">
                  Verified
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-text">
                <span className="flex items-center gap-1">
                  <i className="fas fa-star text-mustard"></i> {cook.rating}
                </span>
                <span className="flex items-center gap-1">
                  <i className="fas fa-map-marker-alt"></i> {cook.address?.split(',')[0]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}