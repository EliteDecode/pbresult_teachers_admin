import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";

import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./pages/Error/ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PrimeReactProvider>
        <App />
        <ToastContainer />
        <Toaster position="top-right" />
      </PrimeReactProvider>
    </Provider>
    {/* <ErrorBoundary>
    </ErrorBoundary> */}
  </React.StrictMode>
);
