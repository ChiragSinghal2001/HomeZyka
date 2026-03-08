import { useState } from 'react';

export default function BecomeCook() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-basil/10 rounded-full flex items-center justify-center mb-6">
          <i className="fas fa-check text-3xl text-basil"></i>
        </div>
        <h2 className="text-4xl mb-4">Application Sent!</h2>
        <p className="text-gray-text max-w-md">We've received your application to join HomeZayka. Our team will review your kitchen details and get back to you within 48 hours.</p>
      </div>
    );
  }

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
            <div className="card-coffee p-8">
              <h3 className="text-2xl mb-4">Why join us?</h3>
              <ul className="space-y-4 text-white/80">
                <li className="flex gap-3"><i className="fas fa-check-circle text-mustard"></i> Set your own hours and menu</li>
                <li className="flex gap-3"><i className="fas fa-check-circle text-mustard"></i> Keep 90% of your earnings</li>
                <li className="flex gap-3"><i className="fas fa-check-circle text-mustard"></i> Build a local brand</li>
              </ul>
            </div>
            <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600" className="rounded-[2.5rem] w-full h-64 object-cover" alt="Cooking" />
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] shadow-lg space-y-5">
            <div>
              <label className="text-sm font-medium mb-2 block">Full Name</label>
              <input type="text" required className="w-full p-4 rounded-xl bg-warm-white border-none focus:ring-2 focus:ring-mustard" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Cuisine Specialties</label>
              <input type="text" placeholder="e.g. Punjabi, Italian" className="w-full p-4 rounded-xl bg-warm-white border-none focus:ring-2 focus:ring-mustard" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Tell us about your kitchen</label>
              <textarea rows="4" className="w-full p-4 rounded-xl bg-warm-white border-none focus:ring-2 focus:ring-mustard"></textarea>
            </div>
            <button type="submit" className="w-full bg-mustard py-4 rounded-full font-bold hover:bg-mustard/90 transition-all">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}