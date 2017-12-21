import React from 'react';
import { NavLink } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

const AuthenticatedNavigation = () => {
  return (
    <nav className="pull-right">
      <NavLink to="/adduser" activeClassName="selected">
        <button>
          AddUser
        </button>
      </NavLink>

      <NavLink to="/library" activeClassName="selected">
        <button>
          Library
        </button>
      </NavLink>

      <NavLink to="/stock" activeClassName="selected">
        <button>
          Stock
        </button>
      </NavLink>

      <button onClick={() => Accounts.logout()}>Logout</button>
    </nav>
  );
}

export default AuthenticatedNavigation;
