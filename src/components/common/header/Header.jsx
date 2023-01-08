import React from 'react';

import { Link, useMatch, useResolvedPath } from "react-router-dom";
import logo from "../../../img/workbalancer_icon.svg";
import './Header.css';
import useAuth from '../../../hooks/useAuth';
import { axiosPrivate } from '../../../api/axios';
import useInput from '../../../hooks/useInput';
import { useNavigate } from "react-router-dom";

const LOGOUT_URL = "api/auth/logout/"

function Header(props) {
  const { auth, setAuth } = useAuth();
  const [user, resetUser, useAttr] = useInput("username", "")
  const navigate = useNavigate();

  const logoutHandler = () => {
    const logoutRequest = async () => {
      try {
        const response = await axiosPrivate.post(
          LOGOUT_URL,
          {},
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        console.log(response?.data);
        setAuth({});
        resetUser();
        navigate("/login", { replace: true });
      } catch (error) {
        console.log(error);
      }
    }
    console.log("logout")
    logoutRequest();
  }


  return (
    <nav className='nav'>
      <Link to="/" className='nav-logo'>
        <div className="logo-text">WorkBalancer</div>
        <img src={logo} alt="cat" className="logo-image" />
      </Link>

      {
        auth?.user &&
        <ul className='nav-navigation'>
          <NavLink to="/">Today</NavLink>
          <NavLink to="/backlog">Backlog</NavLink>
          <NavLink to="/history">History</NavLink>
        </ul>
      }



      <ul className='nav-account'>
        {
          auth?.user ?
            <div className="user-container">
              <div className="username">{auth.user}</div>
              <div className="dropdown-user-menu">
                <div className="logout-btn" onClick={logoutHandler}>logout</div>
              </div>
            </div>
            : <NavLink to="/login">Login</NavLink>
        }

      </ul>

    </nav >

  )
}

function NavLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

export default Header;