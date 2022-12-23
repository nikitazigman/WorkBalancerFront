import React from "react";
import "./App.css";
import { Backlog, Home, Today, Register, Login } from "./components/pages";
import { RequireAuth, Layout } from "./components/common";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        {/* common routers */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/backlog" element={<Backlog />} />
          <Route path="/today" element={<Today />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
