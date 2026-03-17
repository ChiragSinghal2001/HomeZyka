import { Link } from 'react-router-dom';

export default function CookCTA() {
  return (
    <section className="py-24 bg-coffee">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-[7vw]">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-6">Cook for your neighbors</h2>
          <p className="text-white/80 text-lg mb-8">
            Turn your daily cooking into income. Set your own menu, your own hours, and your own prices. We handle bookings and payments.
          </p>
            <div className="flex flex-wrap justify-center gap-4">
            <Link to="/become-cook" className="bg-mustard hover:bg-mustard/90 text-dark px-8 py-4 rounded-full font-medium text-lg transition-all">
              Apply to cook
            </Link>
            <button className="border border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full font-medium text-lg transition-all">
              Download the cook guide
            </button>
          </div>
        </div>
      </div>
    </section>
    
  );
}