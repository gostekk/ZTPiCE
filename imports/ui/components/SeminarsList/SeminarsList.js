import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { ReactiveVar } from 'meteor/reactive-var'

import { Seminars } from '../../../api/Seminars/seminars';

import Loading from '../../components/Loading/Loading';
import SeminarsListItem from '../../components/SeminarsListItem/SeminarsListItem';

const SeminarsList = ({ authAdmin, editOnClickValue, loading, seminars}) => {
  if (loading) {
    return <Loading/>;
  }

  if (seminars.length === 0) {
    return (
      <div>
        No seminars added yet!
      </div>
    );
  } else {
    return (
      <div>
        { seminars.map((seminar) =>
          <SeminarsListItem
            key={seminar._id}
            editMode={new ReactiveVar(false)}
            editOnClickValue={editOnClickValue}
            authAdmin={authAdmin}
            seminar={seminar}
          />
        )}
      </div>
    );
  }
}

SeminarsList.propTypes = {
  authAdmin: PropTypes.bool.isRequired,
  editOnClickValue: PropTypes.bool.isRequired,
  seminars: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('seminars');
  return {
    loading: !subscription.ready(),
    seminars: Seminars.find().fetch(),
  }
})(SeminarsList);
