import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: 'customer',
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const { setCurrentUser } = useApp();

  const handleSignup = (e) => {
    e.preventDefault();
    // In a real app, you would send formData to your backend here
    setCurrentUser({ ...formData });
    localStorage.setItem('homezayka_user', JSON.stringify({ ...formData }));
    
    alert('Account created successfully!');
    navigate(formData.role === 'cook' ? '/dashboard' : '/');
  };

  return (
    <div className="min-h-screen bg-warm-white flex flex-col items-center justify-center py-12 px-4">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-3 mb-10 group">
        <div className="w-12 h-12 bg-mustard rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
          <i className="fas fa-hat-chef text-dark text-xl"></i>
        </div>
        <span className="font-display text-4xl text-dark">HomeZayka</span>
      </Link>

      {/* Signup Card */}
      <div className="bg-white rounded-[3rem] p-10 shadow-sm w-full max-w-lg border border-dark/5">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl text-dark mb-2">Create account</h1>
          <p className="text-gray-text text-lg">Join our community of food lovers</p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center items-center gap-4 mb-10">
          {[1, 2, 3].map((num) => (
            <div 
              key={num}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                step === num ? 'bg-mustard text-dark' : 'bg-warm-white text-gray-text/50'
              }`}
            >
              {num}
            </div>
          ))}
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          {/* Role Selection */}
          <p className="text-center text-gray-text text-sm font-medium mb-4">I want to join as a...</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'customer' })}
              className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${
                formData.role === 'customer' ? 'border-mustard bg-mustard/5' : 'border-dark/5 hover:border-dark/10'
              }`}
            >
              <div className="w-10 h-10 bg-warm-white rounded-full flex items-center justify-center">
                <i className="fas fa-user text-dark"></i>
              </div>
              <div className="text-center">
                <p className="font-bold text-dark">Customer</p>
                <p className="text-[10px] text-gray-text leading-tight">Order home-cooked meals</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'cook' })}
              className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${
                formData.role === 'cook' ? 'border-mustard bg-mustard/5' : 'border-dark/5 hover:border-dark/10'
              }`}
            >
              <div className="w-10 h-10 bg-warm-white rounded-full flex items-center justify-center">
                <i className="fas fa-hat-chef text-dark"></i>
              </div>
              <div className="text-center">
                <p className="font-bold text-dark">Cook</p>
                <p className="text-[10px] text-gray-text leading-tight">Share your cooking</p>
              </div>
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-dark px-1">Full Name</label>
              <div className="relative">
                <i className="fas fa-user absolute left-5 top-1/2 -translate-y-1/2 text-gray-text"></i>
                <input 
                  type="text" 
                  placeholder="Your full name"
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-warm-white/50 border-none outline-none focus:ring-2 focus:ring-mustard"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-dark px-1">Email</label>
              <div className="relative">
                <i className="fas fa-envelope absolute left-5 top-1/2 -translate-y-1/2 text-gray-text"></i>
                <input 
                  type="email" 
                  placeholder="you@example.com"
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-warm-white/50 border-none outline-none focus:ring-2 focus:ring-mustard"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-dark px-1">Phone Number</label>
              <div className="relative">
                <i className="fas fa-phone absolute left-5 top-1/2 -translate-y-1/2 text-gray-text"></i>
                <input 
                  type="tel" 
                  placeholder="+91-XXXXX-XXXXX"
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-warm-white/50 border-none outline-none focus:ring-2 focus:ring-mustard"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-dark px-1">Password</label>
              <div className="relative">
                <i className="fas fa-lock absolute left-5 top-1/2 -translate-y-1/2 text-gray-text"></i>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Create a password"
                  className="w-full pl-14 pr-14 py-4 rounded-2xl bg-warm-white/50 border-none outline-none focus:ring-2 focus:ring-mustard"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-text hover:text-dark transition-colors"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-gray-text text-center px-4 leading-relaxed">
            By creating an account, you agree to our <span className="text-mustard font-bold underline cursor-pointer">Terms of Service</span> and <span className="text-mustard font-bold underline cursor-pointer">Privacy Policy</span>.
          </p>

          <button type="submit" className="w-full bg-mustard hover:bg-mustard/90 text-dark rounded-full py-5 text-lg font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
            Create Account <i className="fas fa-arrow-right"></i>
          </button>
        </form>

        <p className="text-center mt-8 text-gray-text text-lg">
          Already have an account? <Link to="/login" className="text-mustard font-bold hover:underline">Sign in</Link>
        </p>
      </div>

      <Link to="/" className="mt-10 text-gray-text hover:text-dark transition-colors flex items-center gap-2">
        <i className="fas fa-arrow-left text-sm"></i> Back to home
      </Link>
    </div>
  );
}