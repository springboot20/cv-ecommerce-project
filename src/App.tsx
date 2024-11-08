import { RouterProvider } from "react-router-dom";
import Router from "./routes/lazy.import";

function App() {
  return <RouterProvider router={Router()} />;
}

export default App;
