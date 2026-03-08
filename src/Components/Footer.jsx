import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-warm-white border-t border-dark/10">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-[7vw] py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 group mb-6">
              <div className="w-10 h-10 bg-mustard rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                <i className="fas fa-hat-chef text-dark"></i>
              </div>
              <span className="font-display text-2xl text-dark">HomeZayka</span>
            </Link>
            <p className="text-gray-text text-sm leading-relaxed mb-6">Real home food from your neighbors. Connect with local home cooks and enjoy authentic, home-cooked meals.</p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-dark/10 hover:bg-mustard transition-colors"><i className="fab fa-instagram text-sm"></i></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-dark/10 hover:bg-mustard transition-colors"><i className="fab fa-facebook-f text-sm"></i></a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/browse" className="text-gray-text hover:text-dark transition-colors text-sm">Browse Meals</Link></li>
              <li><Link to="/become-cook" className="text-gray-text hover:text-dark transition-colors text-sm">Become a Cook</Link></li>
              <li><Link to="/orders" className="text-gray-text hover:text-dark transition-colors text-sm">My Orders</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-6">Need Help?</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <i className="fas fa-envelope text-mustard mt-0.5"></i>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a href="mailto:support@homezayka.in" className="text-gray-text text-sm hover:text-dark">support@homezayka.in</a>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-6">Stay Updated</h4>
            <p className="text-gray-text text-sm mb-4">Get weekly picks and new cook alerts.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="flex-1 px-4 py-3 rounded-full bg-white border border-dark/10 text-sm focus:outline-none focus:ring-2 focus:ring-mustard" />
              <button className="bg-mustard hover:bg-mustard/90 text-dark px-5 py-3 rounded-full font-medium text-sm transition-all">Join</button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-dark/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-text text-sm">&copy; 2024 HomeZayka. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}