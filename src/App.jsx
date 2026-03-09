import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './pages/Home';
import Browse from './pages/Browse';
import MealDetail from './pages/MealDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';

import HowItWorks from './pages/HowItWorks';
import Dashboard from './pages/Dashboard';
import Cooks from './pages/Cooks';
import BecomeCook from './pages/BecomeCook';
import Orders from './pages/Orders';
import Safety from './pages/Safety';

function App() {
  return (
    <AppProvider>
      <Router>
        {/* Visual FX */}
        <div className="grain-overlay"></div>
        
        {/* Layout Wrapper */}
        <div className="flex flex-col min-h-screen">
          <Navbar />
          
          {/* Main content expands to push footer down */}
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/meal/:id" element={<MealDetail />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cooks" element={<Cooks />} />
              <Route path="/become-cook" element={<BecomeCook />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/safety" element={<Safety />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;