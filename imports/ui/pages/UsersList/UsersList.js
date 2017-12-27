import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import UsersListItem from '../../components/UsersListItem/UsersListItem';
import Loading from '../../components/Loading/Loading';

const UsersList = ({ loading, users}) => (
  !loading ? (
    <div>
      { users.map((user) => <UsersListItem key={user._id} user={user} />) }
    </div>
  ) : <Loading />
);

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
  const subscription = Meteor.subscribe("userList");
  return {
    loading: !subscription.ready(),
    users: Meteor.users.find({}).fetch(),
  }
})(UsersList);
