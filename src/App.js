import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import RequireAuth from "./components/common/requireAuth/RequireAuth"
import Layout from "./components/common/layout/Layout"
import PersistLogin from "./components/common/persistLogin/PersistLogin"

import Backlog from "./components/pages/backlog/Backlog"
import SignUp from "./components/pages/sign_up/SignUp"
import SignIn from "./components/pages/sign_in/SignIn"
import History from "./components/pages/history/History"
import Landing from "./components/pages/landing/Landing"
import Today from "./components/pages/today/Today"

import config from "./configs/config"

function App() {
  return (
    <div className="AppContainer">
      <Routes>
        <Route path={config.links.home} element={<Layout />} >
          {/* common routers */}
          <Route path={config.links.home} element={<Landing />} />
          <Route path={config.links.sign_up} element={<SignUp />} />
          <Route path={config.links.sign_in} element={<SignIn />} />
          {/* protected routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              {/* <Route path={config.links.history} element={<History />} /> */}
              <Route path={config.links.backlog} element={<Backlog />} />
              <Route path={config.links.today} element={<Today />} />
            </Route>
          </Route>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
