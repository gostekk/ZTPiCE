import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const RouteNavigation = () => {
  return (
    <nav>
      <NavLink to="/" exact activeClassName="selected">
        <button>
          Home
        </button>
      </NavLink>

      <NavLink to="/conferences" activeClassName="selected">
        <button>
          Conferences
        </button>
      </NavLink>

      <NavLink to="/seminar" activeClassName="selected">
        <button>
          Seminar
        </button>
      </NavLink>

      <NavLink to="/staff" activeClassName="selected">
        <button>
          Staff
        </button>
      </NavLink>

      <NavLink to="/didactics" activeClassName="selected">
        <button>
          Didactics
        </button>
      </NavLink>

      <NavLink to="/contact" activeClassName="selected">
        <button>
          Contact
        </button>
      </NavLink>
    </nav>
  );
}

export default RouteNavigation;
