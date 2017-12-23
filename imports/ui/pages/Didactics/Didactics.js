import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker} from 'meteor/react-meteor-data';

class Didactics extends React.Component {
  render () {
    return (
      <div>
        Didactics
      </div>
    );
  }
}

export default withTracker(() => {
  const userId = Meteor.userId();
  return {
    authenticated: !!userId,
  }
})(Didactics);
