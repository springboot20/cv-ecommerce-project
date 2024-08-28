import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux/redux.hooks";
import { RootState } from "../app/store";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAppSelector((state: RootState) => state.auth);

  if (!auth?.tokens || !auth.user?._id) {
    return <Navigate to="/login" state={{ path: window.location.pathname }} replace={true} />;
  }

  return children;
};

export default PrivateRoute;
