import { Navigate } from "react-router-dom";
import { RootState } from "../app/store";
import { useAppSelector } from "../hooks/redux/redux.hooks";

const redirectIfAuthenticated = (isAuthenticated: boolean, redirectTo: string): React.ReactNode => {
  if (isAuthenticated) {
    return <Navigate to={redirectTo} state={{ path: window.location.pathname }} replace />;
  }
  return null;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAppSelector((state: RootState) => state.auth);

  return redirectIfAuthenticated(auth.tokens! && auth.isAuthenticated, "/") || children;
};

export const AdminPublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAppSelector((state: RootState) => state.auth);

  return (
    redirectIfAuthenticated(auth.admin! && auth.isAuthenticated, "/admin/overview") || children
  );
};

export default PublicRoute;
