import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css';
import Minesweeper from './Minesweeper';

const root = ReactDOM.createRoot(
  document.getElementById('minesweeper') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Minesweeper />
  </React.StrictMode>
);
