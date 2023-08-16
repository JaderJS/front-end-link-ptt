import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React from "react";
import App from "./App";

import NotFound from "./pages/Notfound/NotFound";
import Property from "./pages/Property";
import TreeView from "./components/TreeView";
import PropertyFocus from "./pages/PropertyFocus";
import Simulation from "./pages/Simulation";
import { Login } from "./pages/Login";

import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Budget from "./pages/Budget/Budget";
import Equipament from "./pages/Equipament/Equipament";

const isTokenPresent = () => {
  const token = localStorage.getItem("authT");
  return token;
};

const ProtectedRoute = ({ element, ...props }) => {
  if (isTokenPresent()) {
    return element;
  } else {
    return <Navigate to="/" />;
  }
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/test" element={<Budget />} />
        <Route path="/home" element={<ProtectedRoute element={<App />} />} />
        <Route path="/propertys" element={<ProtectedRoute element={<Property />} />} />
        <Route path="/station/propertie" element={<ProtectedRoute element={<PropertyFocus />} />} />
        <Route path="/simulation" element={<ProtectedRoute element={<Simulation />} />} />
        <Route path="/treeview" element={<ProtectedRoute element={<TreeView />} />} />
        <Route path="/budget" element={<ProtectedRoute element={<Budget />} />} />
        <Route path="/equipament" element={<ProtectedRoute element={<Equipament />} />} />
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
      theme="light"
    />
  </React.StrictMode>,
  document.getElementById("root")
);
