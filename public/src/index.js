import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { ContextProvider } from "./utils/SocketContext";
import { BrowserRouter  } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
   <ContextProvider>
    <App />
    </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
