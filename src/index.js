import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 

import Dashboard from './Dashboard';
import Modulos from './Modulos';
import Perguntas from './Perguntas';
import Usuarios from './Usuarios';
import Avaliacao from './Avaliacao';
import Relatorio from './Relatorio';
import Login from './Login';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <React.StrictMode>
      <div>
        <Route path="/" element={<Dashboard />} />
        <Route path="/modulos" element={<Modulos />} />
        <Route path="/perguntas" element={<Perguntas />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/avaliacao" element={<Avaliacao />} />
        <Route path="/relatorio" element={<Relatorio />} />
        <Route path="/login" element={<Login />} />
      </div>
    </React.StrictMode>
  </Router>
);
