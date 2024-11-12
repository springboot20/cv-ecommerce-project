import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/redux/redux.hooks";
import { RootState } from "../app/store";

interface ProtectedRouteProps {
  roles: string[];
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles, children }) => {
  const auth = useAppSelector((state: RootState) => state.auth);

  const { pathname } = useLocation();

  console.log(pathname);

  if (!roles.includes(auth.user?.role!) || !auth.isAuthenticated) {
    return <Navigate to="/login" state={{ path: window.location.pathname }} replace={true} />;
  }

  return children;
};
