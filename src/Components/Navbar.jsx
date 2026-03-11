import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Handle the scroll effect for the background transition
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
  // In src/Components/Navbar.jsx
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Use it in your menu:
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
          <div className="w-10 h-10 bg-mustard rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
            <i className="fas fa-hat-chef text-dark"></i>
          </div>
          <span className="font-display text-2xl text-dark">HomeZayka</span>
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
          <Link 
            to="/browse" 
            className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors border border-dark/10"
          >
            <i className="fas fa-search text-dark text-sm"></i>
          </Link>
          <Link 
            to="/login" 
            className="bg-mustard hover:bg-mustard/90 text-dark px-5 py-2.5 rounded-full font-medium text-sm transition-all"
          >
            Sign in
          </Link>
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/80 border border-dark/10"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-dark`}></i>
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
          <Link to="/login" className="text-lg font-medium py-2">Sign in</Link>
        </div>
      </div>
    </nav>
  );
}