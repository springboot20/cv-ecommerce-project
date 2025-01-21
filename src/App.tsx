import { RouterProvider } from "react-router-dom";
import Router from "./routes/lazy.import";
import { useAppDispatch } from "./hooks/redux/redux.hooks";
import { useEffect } from "react";
import { authenticationExpires } from "./features/auth/auth.reducer";
import { LocalStorage } from "./util";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const tokens = LocalStorage.get("tokens");

    if (tokens) {
      dispatch(authenticationExpires(tokens.access_token));
    }
  }, [dispatch]);

  return <RouterProvider router={Router()} />;
}

export default App;
