import React from 'react';
import { NavLink } from 'react-router-dom';

const PublicNavigation = () => {
  return (
    <nav className="pull-right">
      <NavLink to="/login" activeClassName="selected">
        <button>
          Login
        </button>
      </NavLink>
    </nav>
  );
}

export default PublicNavigation;
