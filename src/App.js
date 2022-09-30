import React from "react";
import "./App.css";
import { Header } from "./components/common";
import { Backlog, Home, Today } from "./components/pages";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/backlog" element={<Backlog />} />
          <Route path="/today" element={<Today />} />
        </Routes>
      </div>
      >
    </div>
  );
}

export default App;
