import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();

  if (auth?.tokens?.accessToken && auth.userData) {
    return <Navigate to='/products' state={{ path: window.location.pathname }} replace={true} />;
  }

  return children;
};
