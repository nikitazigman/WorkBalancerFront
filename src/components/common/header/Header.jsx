import React from 'react';
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import useInput from '../../../hooks/useInput';
import useAuth from '../../../hooks/useAuth';
import useAuthAPI from '../../../hooks/useAuthAPI';

import logo from "../../../imgs/logo.svg";
import config from "../../../configs/config"
import './Header.css';

function Header(props) {
  const { auth } = useAuth();
  const [errMsg, { logOut }] = useAuthAPI();

  const navigate = useNavigate();

  const logoutHandler = () => {
    const logoutRequest = async () => {
      const result = await logOut()
      result ? navigate(config.links.sign_in, { replace: true }) : console.log(errMsg)
    }

    logoutRequest();
  }


  return (
    <nav className='nav'>


      <NavLink to={config.links.home}>
        <div className="logo-container">
          <div className="logo-text">WorkBalancer</div>
          <img src={logo} alt="cat face" className='logo-image' />
        </div>
      </NavLink>

      {auth?.user &&
        <div className="main-pages-container">
          <NavLink to={config.links.today}>Today</NavLink>
          <NavLink to={config.links.backlog}>Backlog</NavLink>
          {/* <NavLink to={config.links.history}>History</NavLink> */}
        </div>
      }


      <div className="account-container">
        {
          auth?.user ?
            <div className="user-container">
              <div className="username">{auth.user}</div>
              <div className="dropdown-user-menu">
                <div className="logout-btn" onClick={logoutHandler}>logout</div>
              </div>
            </div>
            :
            <div className="auth-container">
              <NavLink to={config.links.sign_in}>Sign In</NavLink>
              <span>/</span>
              <NavLink to={config.links.sign_up}>Sign Up</NavLink>
            </div>
        }
      </div>
    </nav >

  )
}

function NavLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <div className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </div>
  )
}

export default Header;