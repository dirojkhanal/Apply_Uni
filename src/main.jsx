import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { FormProvider } from "./context/FormContext.jsx"; // if using context

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <FormProvider>
        <App />
      </FormProvider>
  </React.StrictMode>
);
