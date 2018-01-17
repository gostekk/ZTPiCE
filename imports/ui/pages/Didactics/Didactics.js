import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import MaterialsList from '../../components/MaterialsList/MaterialsList';

const Didactics = (props) => {
  return (
    <div>
      { props.authenticated
        ? <button onClick={() => props.history.push('/didactics/add')}>Add</button>
        : undefined }
      <MaterialsList {...props}/>
    </div>
  );
}

Didactics.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};


export default withTracker(() => {
  const userId = Meteor.userId();
  return {
    authenticated: !!userId && Roles.userIsInRole(userId, ['staff', 'admin']),
  }
})(Didactics);
