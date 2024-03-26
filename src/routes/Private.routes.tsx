import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();

  if (auth?.tokens && auth.user) {
    return <Navigate to='/auth/signin' state={{ path: window.location.pathname }} replace={true} />;
  }

  return children;
};
