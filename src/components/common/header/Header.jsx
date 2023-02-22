import React from 'react';
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import useAuth from '../../../hooks/useAuth';
import { axiosPrivate } from '../../../api/axios';
import useInput from '../../../hooks/useInput';

import logo from "../../../imgs/logo.svg";
import config from "../../../configs/config"
import './Header.css';

function Header(props) {
  const { auth, setAuth } = useAuth();
  const [user, resetUser, useAttr] = useInput("username", "")
  const navigate = useNavigate();

  const logoutHandler = () => {
    const logoutRequest = async () => {
      try {
        const response = await axiosPrivate.post(
          config.api.logout,
          {},
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        console.log(response?.data);
        setAuth({});
        resetUser();
        navigate(config.links.sign_in, { replace: true });
      } catch (error) {
        console.log(error);
      }
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


      <div className="main-pages-container">
        <NavLink to={config.links.today}>Today</NavLink>
        <NavLink to={config.links.backlog}>Backlog</NavLink>
        <NavLink to={config.links.history}>History</NavLink>
      </div>

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
            <NavLink to={config.links.sign_in}>SignIn</NavLink>
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