import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function ProtectedRoute({ children, roleRequired }) {
  const { currentUser } = useApp();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (roleRequired && currentUser.role !== roleRequired) {
    if (currentUser.role === 'cook') return <Navigate to="/dashboard" replace />;
    if (currentUser.role === 'customer') return <Navigate to="/user-dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}