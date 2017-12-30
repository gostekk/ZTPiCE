import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const SeminarsListItem = ({ _id, authenticated, date, title, nameDisplayed }) => {
  return (
    <div>
      <p>{ moment(date).format('DD.MM.YYYY') }</p>
      <p>{ nameDisplayed }</p>
      <h5>{ title }</h5>
      { authenticated ? (
        <button onClick={() => {
          Meteor.call('seminars.remove', _id);
        }
        }>X</button>)
      : undefined }
    </div>
  );
}

SeminarsListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
  date: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  nameDisplayed: PropTypes.string.isRequired,
};

export default SeminarsListItem;
