import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import App from './App';

import NotFound from './pages/NotFound';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Estations from './pages/Estations';
import TreeView from './components/TreeView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/estations" element={<Estations />} />
        <Route path="/treeview" element={<TreeView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
