import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import logo from '../assets/logo.jpg';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useApp();

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('homezayka_user');
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

<button onClick={() => scrollToSection('how-it-works')} className="text-sm font-medium text-gray-text hover:text-dark">
  How it works
</button>

  // Close mobile menu when switching routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav 
      id="navbar" 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-warm-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8 xl:px-[7vw] py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="HomeZayka" className="h-10 w-auto rounded-xl shadow-sm object-cover transition-transform group-hover:scale-105" />
        </Link>
        
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/browse" className="text-sm font-medium text-gray-text hover:text-dark transition-colors">Browse</Link>
          <Link to="/how-it-works" className="text-sm font-medium text-gray-text hover:text-dark transition-colors">How it works</Link>
          <Link to="/cooks" className="text-sm font-medium text-gray-text hover:text-dark transition-colors">Cooks</Link>
          <Link to="/safety" className="text-sm font-medium text-gray-text hover:text-dark transition-colors">Safety</Link>
        </div>

        {/* Desktop Buttons */}
        <div className="flex items-center gap-4">
          {currentUser ? (
            <div className="relative">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-mustard hover:scale-105 transition-transform cursor-pointer focus:outline-none"
                >
                  <img 
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'} 
                    alt="Profile" 
                    className="w-full h-full object-cover" 
                  />
                </button>
              </div>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-lg border border-dark/5 py-2 overflow-hidden z-[100]">
                  <Link 
                    to={currentUser.role === 'cook' ? '/dashboard' : '/user-dashboard'} 
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-dark hover:bg-warm-white transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-mustard/10 flex items-center justify-center text-mustard">
                      <i className="fas fa-columns"></i>
                    </div>
                    Dashboard
                  </Link>
                  {currentUser.role === 'cook' && (
                    <Link 
                      to={`/cooks/${currentUser.id}`} 
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-dark hover:bg-warm-white transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-basil/10 flex items-center justify-center text-basil">
                        <i className="fas fa-user"></i>
                      </div>
                      My Public Profile
                    </Link>
                  )}
                  <div className="h-[1px] bg-dark/5 my-1 mx-4"></div>
                  <button 
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-3 text-left px-5 py-3 text-sm font-medium text-tomato hover:bg-tomato/5 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-tomato/10 flex items-center justify-center">
                      <i className="fas fa-sign-out-alt"></i>
                    </div>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-mustard hover:bg-mustard/90 text-dark px-5 py-2.5 rounded-full font-medium text-sm transition-all"
            >
              Sign in
            </Link>
          )}
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/80 border border-dark/10"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-dark text-xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden bg-warm-white/98 backdrop-blur-md border-t border-dark/10 transition-all duration-300 overflow-hidden ${
        isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 py-4 flex flex-col gap-4">
          <Link to="/browse" className="text-lg font-medium py-2">Browse</Link>
          <Link to="/how-it-works" className="text-lg font-medium py-2">How it works</Link>
          <Link to="/cooks" className="text-lg font-medium py-2">Cooks</Link>
          <Link to="/safety" className="text-lg font-medium py-2">Safety</Link>
        </div>
      </div>
    </nav>
  );
}