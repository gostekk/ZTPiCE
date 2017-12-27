import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const SeminarsListItem = ({ _id, authenticated, title, date }) => {
  return (
    <div>
      <h4>{title}</h4>
      <p>{moment(date).format('DD.MM.YYYY')}</p>
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
  title: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
};

export default SeminarsListItem;
