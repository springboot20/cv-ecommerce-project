import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux/redux.hooks";
import { RootState } from "../app/store";
import { useEffect } from "react";
import { authenticationExpires } from "../features/auth/auth.reducer";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = auth?.tokens?.access_token;

    if (token) {
      dispatch(authenticationExpires(token));
    }
  }, [dispatch]);

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ path: window.location.pathname }} replace={true} />;
  }

  return children;
};

export default PrivateRoute;
