import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React from "react";
import App from "./App";

import NotFound from "./pages/NotFound";
import Property from "./pages/Property";
import TreeView from "./components/TreeView";
import PropertyFocus from "./pages/PropertyFocus";

import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/propertys" element={<Property />} />
        <Route path="/station/propertie" element={<PropertyFocus />} />
        <Route path="/treeview" element={<TreeView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  </React.StrictMode>,
  document.getElementById("root")
);
