import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Components/ProtectedRoute';
import Footer from './Components/Footer';
import Home from './pages/Home';
import Browse from './pages/Browse';
import MealDetail from './pages/MealDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SignupCustomer from './pages/SignupCustomer';
import SignupCook from './pages/SignupCook';
import CookProfile from './pages/CookProfile';
import MyOrders from './pages/MyOrders';
import UserDashboard from './pages/UserDashboard';
import HowItWorks from './pages/HowItWorks';
import Dashboard from './pages/Dashboard';
import Cooks from './pages/Cooks';
import BecomeCook from './pages/BecomeCook';
import Orders from './pages/Orders';
import Safety from './pages/Safety';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="grain-overlay"></div>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/meal/:id" element={<MealDetail />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signup/customer" element={<SignupCustomer />} />
              <Route path="/signup/cook" element={<SignupCook />} />
              <Route path="/dashboard" element={<ProtectedRoute roleRequired="cook"><Dashboard /></ProtectedRoute>} />
              <Route path="/cooks" element={<Cooks />} />
              <Route path="/become-cook" element={<BecomeCook />} />
              <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/cooks/:id" element={<CookProfile />} />
              <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
              <Route path="/user-dashboard" element={<ProtectedRoute roleRequired="customer"><UserDashboard /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;