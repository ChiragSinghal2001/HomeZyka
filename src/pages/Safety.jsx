import React from 'react';

import Testimonials from '../Components/Testimonials';
import CookCTA from '../Components/CookCTA';
import TopCooks from '../Components/TopCooks';

export default function Safety() {
  return (

    <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 xl:px-[7vw]">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl sm:text-6xl text-dark mb-4">You're in safe hands</h1>
        <p className="text-gray-text text-lg max-w-2xl mx-auto">
          Your safety and satisfaction are our top priorities. Here is how we ensure a secure community for everyone.
        </p>
      </div>

      <div className="space-y-[-2rem]">
        {/* Verified Cooks Section */}
        <div className="card-tomato p-8 sm:p-12 relative z-30 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <i className="fas fa-check-circle text-2xl"></i>
                <h3 className="font-display text-2xl sm:text-3xl">Verified Cooks</h3>
              </div>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  ID verification for all cooks
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  Kitchen hygiene checks
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  Transparent review system
                </li>
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-inner">
              <img 
                src="https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=600&h=400&fit=crop" 
                alt="Verified cooks" 
                className="w-full h-56 object-cover" 
              />
            </div>
          </div>
        </div>

        {/* Clear Ingredients Section */}
        <div className="card-basil p-8 sm:p-12 relative z-20 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <i className="fas fa-shield-alt text-2xl"></i>
                <h3 className="font-display text-2xl sm:text-3xl">Clear Ingredients</h3>
              </div>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  Full allergen information
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  Oil and spice level indicators
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  Accurate portion sizes
                </li>
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden md:order-1 shadow-inner">
              <img 
                src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop" 
                alt="Clear ingredients" 
                className="w-full h-56 object-cover" 
              />
            </div>
          </div>
        </div>

        {/* Secure Payments Section */}
        <div className="card-cream p-8 sm:p-12 relative z-10 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <i className="fas fa-credit-card text-2xl text-dark"></i>
                <h3 className="font-display text-2xl sm:text-3xl text-dark">Secure Payments</h3>
              </div>
              <ul className="space-y-3 text-dark/70">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-dark rounded-full"></span>
                  Pay only after confirmation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-dark rounded-full"></span>
                  Easy refund process
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-dark rounded-full"></span>
                  24/7 support chat
                </li>
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-inner">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" 
                alt="Secure payments" 
                className="w-full h-56 object-cover" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Support CTA */}
      <div className="mt-24 text-center p-12 bg-white rounded-[2.5rem] border border-dark/10">
        <h2 className="font-display text-3xl mb-4">Still have questions?</h2>
        <p className="text-gray-text mb-8">Our support team is available Mon–Sat, 9am–7pm to help with any concerns.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="mailto:support@homezayka.in" className="bg-dark text-white px-8 py-4 rounded-full font-medium transition-all hover:bg-dark/90">
            Email Support
          </a>
          <a href="tel:+91-XXXX-XXXXXX" className="border border-dark/20 text-dark px-8 py-4 rounded-full font-medium transition-all hover:bg-warm-white">
            Call Us
          </a>
        </div>
      </div>

<div className="bg-warm-white">
        <Testimonials />
        <TopCooks />
        <CookCTA />
      </div>
     </main>
  );
}
