import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();

  if (auth?.tokens?.access_token && auth.user) {
    return <Navigate to='/products' state={{ path: window.location.pathname }} replace={true} />;
  }

  return children;
};
