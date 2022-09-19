import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import logger from "./services/utils/logger";
import App from "./App";
import "./index.css";
import "font-awesome/css/font-awesome.css";

logger.init();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
