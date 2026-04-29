import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import logo from '../assets/logo.jpg';

export default function SignupCustomer() {
  const [formData, setFormData] = useState({
    role: 'customer',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    address: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const { setCurrentUser } = useApp();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: 'customer',
          phone: formData.phone,
          address: formData.address
        })
      });
      const data = await res.json();
      if(res.ok) {
        setCurrentUser(data.user);
        localStorage.setItem('homezayka_user', JSON.stringify(data.user));
        localStorage.setItem('homezayka_token', data.token);
        alert('Customer account created successfully!');
        navigate('/user-dashboard');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  return (
    <div className="min-h-screen bg-warm-white flex flex-col items-center justify-center py-12 px-4">
      <Link to="/" className="flex items-center gap-3 mb-10 group">
        <img src={logo} alt="HomeZayka" className="h-16 w-auto rounded-2xl shadow-sm object-cover transition-transform group-hover:scale-105" />
      </Link>

      <div className="bg-white rounded-[3rem] p-10 shadow-sm w-full max-w-lg border border-dark/5">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl text-dark mb-2">Join as Customer</h1>
          <p className="text-gray-text text-lg">Order fresh home-cooked meals</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
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
              <label className="text-sm font-semibold text-dark px-1">Delivery Address</label>
              <div className="relative">
                <i className="fas fa-map-marker-alt absolute left-5 top-4 text-gray-text"></i>
                <textarea 
                  placeholder="Enter your complete delivery address"
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-warm-white/50 border-none outline-none focus:ring-2 focus:ring-mustard resize-none"
                  rows="2"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                ></textarea>
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

          <p className="text-[10px] text-gray-text text-center px-4 leading-relaxed mt-4">
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

      <Link to="/signup" className="mt-10 text-gray-text hover:text-dark transition-colors flex items-center gap-2">
        <i className="fas fa-arrow-left text-sm"></i> Back to roles
      </Link>
    </div>
  );
}