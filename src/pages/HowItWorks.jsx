import React from 'react';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Browse menus",
      description: "Filter by cuisine, dietary needs, and pickup time. See photos, reviews, and ingredients.",
      linkText: "Explore cuisines",
      linkPath: "/browse",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
      color: "card-tomato"
    },
    {
      id: "02",
      title: "Book a meal",
      description: "Pick a portion, choose your slot, and confirm in seconds. Pay securely in the app.",
      linkText: "See how booking works",
      linkPath: "/browse",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
      color: "card-basil"
    },
    {
      id: "03",
      title: "Pick up & enjoy",
      description: "Meet your cook nearby, grab your meal warm, and leave a review to say thanks.",
      linkText: "Read safety tips",
      linkPath: "/safety",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
      color: "card-cream"
    }
  ];

  return (
    <main className="py-24 px-4 sm:px-6 lg:px-8 xl:px-[7vw]">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl sm:text-6xl text-dark mb-4">How HomeZayka works</h1>
        <p className="text-gray-text text-lg max-w-xl mx-auto">
          Three simple steps to your next home-cooked meal.
        </p>
      </div>

      {/* Steps List */}
      <div className="space-y-[-2rem]">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className={`${step.color} p-8 sm:p-12 relative shadow-xl`} 
            style={{ zIndex: 30 - index }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className={index % 2 !== 0 ? "md:order-2" : ""}>
                <span className={`text-label ${step.color === 'card-cream' ? 'text-dark/70' : 'text-white/70'} mb-4 block`}>
                  Step {step.id}
                </span>
                <h3 className={`font-display text-3xl sm:text-4xl mb-4 ${step.color === 'card-cream' ? 'text-dark' : 'text-white'}`}>
                  {step.title}
                </h3>
                <p className={`${step.color === 'card-cream' ? 'text-dark/70' : 'text-white/80'} text-lg mb-6`}>
                  {step.description}
                </p>
                <Link 
                  to={step.linkPath} 
                  className={`inline-flex items-center gap-2 font-medium hover:gap-3 transition-all ${step.color === 'card-cream' ? 'text-dark' : 'text-white'}`}
                >
                  {step.linkText} <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
              <div className={`rounded-2xl overflow-hidden shadow-inner ${index % 2 !== 0 ? "md:order-1" : ""}`}>
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-64 object-cover" 
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-24 bg-coffee rounded-[2.5rem] p-8 sm:p-16 text-center text-white">
        <h2 className="font-display text-3xl sm:text-5xl mb-6">Ready to taste the difference?</h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of neighbors enjoying authentic home-cooked meals every day.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/browse" 
            className="bg-mustard text-dark px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all"
          >
            Browse Today's Meals
          </Link>
          <Link 
            to="/become-cook" 
            className="border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
          >
            Start Cooking Instead
          </Link>
        </div>
      </div>
    </main>
  );
}