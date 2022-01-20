import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  Navigation,
  Homepage,
  Cryptocurrencies,
  News,
  CryptoDetails,
  Footer,
} from "./components";

// import { Button, Offcanvas, Container, Navbar, Nav, Row, Col } from "react-bootstrap";

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className="d-flex flex-column h-100">
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route
            exact
            path="/cryptocurrencies"
            element={<Cryptocurrencies />}
          />
          <Route path="/crypto/:id" element={<CryptoDetails />} />
          <Route exact path="/news" element={<News />} />
        </Routes>
        <Footer />
      </div>
  );
};

export default App;
