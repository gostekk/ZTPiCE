import React from 'react';
import PropTypes from 'prop-types';
import { withTracker} from 'meteor/react-meteor-data';

import { Things } from '../../../api/Things/things';

import ThingsListItem from '../../components/ThingsListItem/ThingsListItem';
import Loading from '../../components/Loading/Loading';

const ThingsList = ({ loading, things}) => {
  if (loading) {
    if ( things.length === 0 ) {
      return (
        <div>
          Nothing added yet !
        </div>
      );
    }
    return (
      <div>
        { things.map((thing) =>
          <ThingsListItem key={thing._id} {...thing} />
        )}
      </div>
    );
  } else {
    return <Loading />;
  }
}

ThingsList.propTypes = {
  things: PropTypes.arrayOf(PropTypes.object),
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('things');
  return {
    loading: subscription.ready(),
    things: Things.find().fetch(),
  }
})(ThingsList);
