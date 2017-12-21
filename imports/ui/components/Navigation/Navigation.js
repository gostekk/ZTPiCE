import React from 'react';
import PropTypes from 'prop-types';

import AuthenticatedNavigation from '../AuthenticatedNavigation/AuthenticatedNavigation';
import PublicNavigation from '../PublicNavigation/PublicNavigation';
import RouteNavigation from '../RouteNavigation/RouteNavigation';

const Navigation = (props) => {
  return (
    <div>
      <RouteNavigation {...props} />
      {
        !props.authenticated
          ? <PublicNavigation />
          : <AuthenticatedNavigation {...props} />
      }
    </div>
  );
}

Navigation.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default Navigation;
