import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&h=1080&fit=crop" 
          alt="Cozy kitchen" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 xl:px-[7vw] w-full py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] mb-6">
              Discover home food <span className="text-mustard">near you.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-lg mb-8">
              Browse neighbor-made meals, book a pickup time, and enjoy food that tastes like home.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/browse" 
                className="bg-mustard hover:bg-mustard/90 text-dark px-8 py-4 rounded-full font-medium text-lg inline-flex items-center gap-2 transition-all"
              >
                Browse Meals <i className="fas fa-arrow-right"></i>
              </Link>
              <Link 
                to="/cooks" 
                className="border border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full font-medium text-lg transition-all"
              >
                Meet the Cooks
              </Link>
            </div>
          </div>

          {/* Quick Search Card */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-[2.5rem] p-6 shadow-2xl max-w-md ml-auto">
              <div className="rounded-2xl overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop" 
                  alt="Delicious food" 
                  className="w-full h-48 object-cover" 
                />
              </div>
              <h3 className="font-display text-2xl text-dark mb-4">What are you craving?</h3>
              <div className="relative">
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-text"></i>
                <input 
                  type="text" 
                  placeholder="Try: biryani, pasta, thali..." 
                  className="pl-12 pr-4 py-4 rounded-full bg-warm-white w-full border-none text-dark focus:outline-none focus:ring-2 focus:ring-mustard" 
                />
                <Link 
                  to="/browse" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-mustard text-dark px-6 py-2 rounded-full font-medium text-sm hover:bg-mustard/90 transition-colors"
                >
                  Search
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}