import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker} from 'meteor/react-meteor-data';

const UsersList = (props) => {
  console.log(props.users);
  return (
    <div>
      UsersList
    </div>
  );
}

export default withTracker(() => {
  Meteor.subscribe("userList");
  return {
    users: Meteor.users.find({}).fetch(),
  }
})(UsersList);
