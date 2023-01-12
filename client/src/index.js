import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Header from './partial/Header';
import Stock from './page/Stock.js';
import AddCoil from './page/AddCoil';
import Quotation from './page/Quotation.js';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Stock />} />
          <Route path="/addcoil" element={<AddCoil />} />
          <Route path="/quotation" element={<Quotation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
