import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { Loader } from "./components/Loader";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./app/store.ts";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { SocketIoProvider } from "./context/SocketIoContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <SocketIoProvider>
          <SkeletonTheme>
            <ToastContainer />
            <Suspense fallback={<Loader />}>
              <App />
            </Suspense>
          </SkeletonTheme>
        </SocketIoProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
