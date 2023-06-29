import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import App from './App';

import NotFound from './pages/NotFound';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Property from './pages/Property';
import TreeView from './components/TreeView';
import PropertyFocus from './pages/PropertyFocus';

const root = ReactDOM.createRoot(document.getElementById('root'));
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
  </React.StrictMode>,
  document.getElementById('root')
);
