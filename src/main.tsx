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
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <SkeletonTheme>
          <ToastContainer />
          <Suspense fallback={<Loader />}>
            <PayPalScriptProvider
              options={{
                clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID as string,
                "enable-founding": "venom",
              }}
            >
              <App />
            </PayPalScriptProvider>
          </Suspense>
        </SkeletonTheme>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
