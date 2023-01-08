import React from "react";
import "./App.css";
import { Backlog, Today, Register, Login, History } from "./components/pages";
import { RequireAuth, Layout, PersistLogin } from "./components/common";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        {/* common routers */}
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="history" element={<History />} />
            <Route path="backlog" element={<Backlog />} />
            <Route path="/" element={<Today />} />
          </Route>
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
