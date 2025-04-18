import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import HomePage from "./pages/core-booking/HomePage";
import SearchResults from "./pages/core-booking/SearchResults";

import "./styles.css";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
