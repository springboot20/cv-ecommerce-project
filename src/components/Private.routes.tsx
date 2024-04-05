import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();

  if (auth?.tokens && auth.userData) {
    return <Navigate to='/auth/signin' state={{ path: window.location.pathname }} replace={true} />;
  }

  return children;
};

export default PrivateRoute
