import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";
//
import Nav from "./components/Nav";
import MainPage from "./components/MainPage";
import Product from "./components/Product";
import Products from "./components/Products";
//
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Nav />
      <React.Suspense fallback={"loading!!!"}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/products/:id" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </React.Suspense>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
