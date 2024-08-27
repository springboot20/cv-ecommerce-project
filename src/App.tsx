import { RouterProvider } from "react-router-dom";
import Router from "./routes/lazy.import";
import { useAppSelector } from "./hooks/redux/redux.hooks";
import { RootState } from "./app/store";

function App() {
  const { tokens, user } = useAppSelector((state: RootState) => state.auth.data);

  return <RouterProvider router={Router(tokens!, user!)} />;
}

export default App;
