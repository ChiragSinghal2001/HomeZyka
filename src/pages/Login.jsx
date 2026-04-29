// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useApp } from '../context/AppContext';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const { setCurrentUser } = useApp();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const isCook = email.includes('cook');
//     const userData = {
//       email,
//       role: isCook ? 'cook' : 'customer',
//       name: isCook ? 'Demo Cook' : 'Demo Customer'
//     };
//     setCurrentUser(userData);
//     localStorage.setItem('homezayka_user', JSON.stringify(userData));
//     navigate(isCook ? '/dashboard' : '/');
//   };

//   return (
//     <div className="min-h-screen bg-warm-white flex flex-col items-center justify-center py-12 px-4">
//       {/* Brand Logo Header */}
//       <Link to="/" className="flex items-center gap-3 mb-10 group">
//         <div className="w-12 h-12 bg-mustard rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
//           <i className="fas fa-hat-chef text-dark text-xl"></i>
//         </div>
//         <span className="font-display text-4xl text-dark">HomeZayka</span>
//       </Link>

//       {/* Main Login Card */}
//       <div className="bg-white rounded-[3rem] p-10 shadow-sm w-full max-w-lg border border-dark/5">
//         <div className="text-center mb-10">
//           <h1 className="font-display text-4xl text-dark mb-3">Welcome back</h1>
//           <p className="text-gray-text text-lg">Sign in to continue to HomeZayka</p>
//         </div>

//         <form onSubmit={handleLogin} className="space-y-6">
//           {/* Email Input */}
//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-dark px-1">Email</label>
//             <div className="relative">
//               <i className="fas fa-envelope absolute left-5 top-1/2 -translate-y-1/2 text-gray-text"></i>
//               <input 
//                 type="email" 
//                 placeholder="you@example.com"
//                 className="w-full pl-14 pr-6 py-4 rounded-2xl bg-warm-white/50 border-none focus:ring-2 focus:ring-mustard outline-none transition-all placeholder:text-gray-text/60"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           {/* Password Input */}
//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-dark px-1">Password</label>
//             <div className="relative">
//               <i className="fas fa-lock absolute left-5 top-1/2 -translate-y-1/2 text-gray-text"></i>
//               <input 
//                 type={showPassword ? "text" : "password"} 
//                 placeholder="Enter your password"
//                 className="w-full pl-14 pr-14 py-4 rounded-2xl bg-warm-white/50 border-none focus:ring-2 focus:ring-mustard outline-none transition-all"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <button 
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-text hover:text-dark transition-colors"
//               >
//                 <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
//               </button>
//             </div>
//           </div>

//           {/* Remember & Forgot Password */}
//           <div className="flex items-center justify-between px-1 text-sm">
//             <label className="flex items-center gap-2 cursor-pointer text-gray-text">
//               <input type="checkbox" className="w-4 h-4 rounded border-dark/10 accent-mustard" />
//               Remember me
//             </label>
//             <button type="button" className="text-mustard font-semibold hover:underline">
//               Forgot password?
//             </button>
//           </div>

//           {/* Sign In Button */}
//           <button type="submit" className="w-full bg-mustard hover:bg-mustard/90 text-dark rounded-full py-5 text-lg font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
//             Sign In <i className="fas fa-arrow-right"></i>
//           </button>
//         </form>

//         {/* Social Divider */}
//         <div className="relative my-10">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-dark/10"></div>
//           </div>
//           <div className="relative flex justify-center">
//             <span className="bg-white px-4 text-sm text-gray-text">Or continue with</span>
//           </div>
//         </div>

//         {/* Demo Accounts Buttons */}
//         <div className="grid grid-cols-2 gap-4 mb-8">
//           <button 
//             type="button"
//             onClick={() => setEmail('cook@example.com')}
//             className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-dark/10 hover:bg-warm-white transition-all font-semibold text-sm"
//           >
//             Demo Cook
//           </button>
//           <button 
//             type="button"
//             onClick={() => setEmail('customer@example.com')}
//             className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-dark/10 hover:bg-warm-white transition-all font-semibold text-sm"
//           >
//             <i className="fas fa-user text-xs"></i> Demo Customer
//           </button>
//         </div>

//         {/* Footer Link */}
//         <p className="text-center text-gray-text text-lg">
//           Don't have an account? <Link to="/signup" className="text-mustard font-bold hover:underline">Sign up</Link>
//         </p>
//       </div>

//       {/* Back to Home Link */}
//       <Link to="/" className="mt-10 text-gray-text hover:text-dark transition-colors flex items-center gap-2">
//         <i className="fas fa-arrow-left text-sm"></i> Back to home
//       </Link>
//     </div>
//   );
// }

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import logo from '../assets/logo.jpg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setCurrentUser } = useApp();

  // Unified login logic for both form submission and demo buttons
  const performLogin = (userEmail, userRole, userName, userId) => {
    const userData = {
      id: userId || 'user_' + Date.now(),
      email: userEmail,
      role: userRole,
      name: userName,
      avatar: userRole === 'cook' 
        ? 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&h=400&fit=crop' 
        : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    };
    
    setCurrentUser(userData);
    localStorage.setItem('homezayka_user', JSON.stringify(userData));
    
    // Reroute based on role
    if (userRole === 'cook') {
      navigate('/cooks/u1');
    } else {
      navigate('/user-dashboard');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const isCook = email.includes('cook');
    performLogin(
      email, 
      isCook ? 'cook' : 'customer', 
      isCook ? 'Demo Cook' : 'Demo Customer',
      isCook ? 'u1' : 'u2'
    );
  };

  return (
    <div className="min-h-screen bg-warm-white flex flex-col items-center justify-center py-12 px-4">
      <Link to="/" className="flex items-center gap-3 mb-10 group">
        <img src={logo} alt="HomeZayka" className="h-16 w-auto rounded-2xl shadow-sm object-cover transition-transform group-hover:scale-105" />
      </Link>

      <div className="bg-white rounded-[3rem] p-10 shadow-sm w-full max-w-lg border border-dark/5">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl text-dark mb-3">Welcome back</h1>
          <p className="text-gray-text text-lg">Sign in to continue to HomeZayka</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-dark px-1">Email</label>
            <div className="relative">
              <i className="fas fa-envelope absolute left-5 top-1/2 -translate-y-1/2 text-gray-text"></i>
              <input 
                type="email" 
                placeholder="you@example.com"
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-warm-white/50 border-none focus:ring-2 focus:ring-mustard outline-none transition-all placeholder:text-gray-text/60"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-dark px-1">Password</label>
            <div className="relative">
              <i className="fas fa-lock absolute left-5 top-1/2 -translate-y-1/2 text-gray-text"></i>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password"
                className="w-full pl-14 pr-14 py-4 rounded-2xl bg-warm-white/50 border-none focus:ring-2 focus:ring-mustard outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <button type="submit" className="w-full bg-mustard hover:bg-mustard/90 text-dark rounded-full py-5 text-lg font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
            Sign In <i className="fas fa-arrow-right"></i>
          </button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-dark/10"></div></div>
          <div className="relative flex justify-center"><span className="bg-white px-4 text-sm text-gray-text">Quick Demo Access</span></div>
        </div>

        {/* Updated Demo Buttons with direct navigation */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            type="button"
            onClick={() => performLogin('cook@example.com', 'cook', 'Aman (Cook)', 'u1')}
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-dark/10 hover:bg-mustard hover:text-dark hover:border-mustard transition-all font-bold text-sm"
          >
            <i className="fas fa-hat-chef text-xs"></i> Demo Cook
          </button>
          <button 
            type="button"
            onClick={() => performLogin('customer@example.com', 'customer', 'Shabana (User)', 'u2')}
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-dark/10 hover:bg-mustard hover:text-dark hover:border-mustard transition-all font-bold text-sm"
          >
            <i className="fas fa-user text-xs"></i> Demo User
          </button>
        </div>

        <p className="text-center text-gray-text text-lg">
          Don't have an account? <Link to="/signup" className="text-mustard font-bold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}