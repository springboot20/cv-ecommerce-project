import { Navigate } from "react-router-dom";
import { RootState } from "../app/store";
import { useAppSelector } from "../hooks/redux/redux.hooks";

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAppSelector((state: RootState) => state.auth);

  if (auth.isAuthenticated) {
    return <Navigate to="/" state={{ path: window.location.pathname }} replace={true} />;
  }

  return children;
};

export default PublicRoute;
