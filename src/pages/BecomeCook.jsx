import { Link } from 'react-router-dom';

export default function BecomeCook() {
  return (
    <main className="py-16 px-4 sm:px-6 lg:px-8 xl:px-[7vw]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="bg-mustard/20 text-dark text-sm px-3 py-1 rounded-full mb-4 inline-block">Join our Community</span>
          <h1 className="text-5xl mb-4">Cook for your neighbors</h1>
          <p className="text-gray-text text-lg">Turn your daily cooking into income. We handle the technology; you handle the flavor.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="bg-[#D3A971] p-8 rounded-3xl text-white">
              <h3 className="text-2xl mb-4">Why join us?</h3>
              <ul className="space-y-4 text-white/90">
                <li className="flex gap-3"><i className="fas fa-check-circle text-white mt-1"></i> Set your own hours and menu</li>
                <li className="flex gap-3"><i className="fas fa-check-circle text-white mt-1"></i> Keep 90% of your earnings</li>
                <li className="flex gap-3"><i className="fas fa-check-circle text-white mt-1"></i> Build a local brand</li>
              </ul>
            </div>
            <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600" className="rounded-[2.5rem] w-full h-64 object-cover" alt="Cooking" />
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-lg flex flex-col items-center justify-center text-center space-y-6 min-h-[400px] border border-dark/5">
            <div className="w-20 h-20 bg-mustard/20 rounded-full flex items-center justify-center mb-2">
              <i className="fas fa-hat-chef text-3xl text-dark"></i>
            </div>
            <h2 className="font-display text-3xl text-dark">Ready to get started?</h2>
            <p className="text-gray-text mb-4">Create your cook profile, set up your menu, and start taking orders today.</p>
            <Link
              to="/signup/cook"
              className="w-full bg-mustard py-5 rounded-full text-lg font-bold hover:bg-mustard/90 transition-all text-dark shadow-md"
            >
              Sign Up as Cook
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}