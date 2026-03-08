import React from 'react';

export default function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 xl:px-[7vw]">
      {/* Added Header Section */}
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl sm:text-5xl text-dark mb-4">
          What the community says
        </h2>
        <p className="text-gray-text text-lg max-w-xl mx-auto">
          Real stories from real people in our community.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Testimonial 1 - Tomato */}
        <div className="bg-tomato rounded-[3rem] p-10 sm:p-14 text-white relative shadow-lg">
          <i className="fas fa-quote-left text-4xl opacity-20 mb-8 block"></i>
          <p className="font-display text-2xl sm:text-4xl leading-tight mb-10">
            "I've stopped ordering restaurant food. This tastes better and I know who made it."
          </p>
          <div className="flex items-center gap-4">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop" 
              className="w-14 h-14 rounded-full object-cover border-2 border-white/20" 
              alt="Riya" 
            />
            <div>
              <p className="font-bold text-lg leading-none">Riya</p>
              <p className="text-white/70 text-sm mt-1">Customer</p>
            </div>
          </div>
        </div>

        {/* Testimonial 2 - Basil */}
        <div className="bg-basil rounded-[3rem] p-10 sm:p-14 text-white relative shadow-lg">
          <i className="fas fa-quote-left text-4xl opacity-20 mb-8 block"></i>
          <p className="font-display text-2xl sm:text-4xl leading-tight mb-10">
            "I started cooking for four neighbors. Now I serve twenty meals a week."
          </p>
          <div className="flex items-center gap-4">
            <img 
              src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=120&h=120&fit=crop" 
              className="w-14 h-14 rounded-full object-cover border-2 border-white/20" 
              alt="Farah" 
            />
            <div>
              <p className="font-bold text-lg leading-none">Farah</p>
              <p className="text-white/70 text-sm mt-1">Home Cook</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}