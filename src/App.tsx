import { RouterProvider } from "react-router-dom";
import Router from "./routes/lazy.import";
import { useAppSelector } from "./hooks/redux/redux.hooks";
import { RootState } from "./app/store";

function App() {
  const { tokens } = useAppSelector((state: RootState) => state.auth.data);

  return <RouterProvider router={Router(tokens!)} />;
}

export default App;
