import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import {
  Navbar,
  Homepage,
  Cryptocurrencies,
  News,
  CryptoDetails,
  Footer,
} from "./components";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <Layout>
          <div className="routes">
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
          </div>
        </Layout>
        <Footer />
      </main>
    </div>
  );
};

export default App;
