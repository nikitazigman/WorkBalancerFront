import React from 'react';

import { Link, useMatch, useResolvedPath } from "react-router-dom";
import './Header.css';

function Header(props) {

  return (
    <nav className='nav'>
      <Link to="/" className='nav-logo'>WorkBalancer</Link>

      <ul className='nav-navigation'>
        <NavLink to="/today">Today</NavLink>
        <NavLink to="/backlog">Backlog</NavLink>
      </ul>


      <ul className='nav-account'>
        <NavLink to="/user">UserName</NavLink>
        <NavLink to="/logout">Logout</NavLink>
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