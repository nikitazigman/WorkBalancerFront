import React from 'react';

import { Link, useMatch, useResolvedPath } from "react-router-dom";
import logo from "../../../img/workbalancer_icon.svg";
import './Header.css';
import useAuth from '../../../hooks/useAuth';

function Header(props) {
  const { auth } = useAuth()
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
            <NavLink to="/user">{auth.user}</NavLink>
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