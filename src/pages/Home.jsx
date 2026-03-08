import Hero from '../Components/Hero';
import HowItWorks from '../pages/HowItWorks';
import Browse from '../pages/Browse';
import Safety from '../pages/Safety';
import { useApp } from '../context/AppContext';

export default function Home() {
  const { meals } = useApp();

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Today's Picks (Mini-Browse) */}
      <section id="featured-meals" className="bg-warm-white">
        <div className="text-center py-12">
          <h2 className="font-display text-4xl md:text-5xl">Today's Picks Near You</h2>
          <p className="text-gray-text mt-2">Hand-checked meals available today</p>
        </div>
        <Browse isPreview={true} /> 
      </section>

      {/* 3. How It Works Section */}
      <section id="how-it-works">
        <HowItWorks />
      </section>

      {/* 4. Safety & Trust Section */}
      <section id="safety">
        <Safety />
      </section>
    </div>
  );
}