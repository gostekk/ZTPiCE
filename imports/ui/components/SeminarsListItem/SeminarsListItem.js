import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const SeminarsListItem = ({ title, date }) => {
  return (
    <div>
      <h4>{title}</h4>
      <p>{moment(date).format('DD.MM.YYYY')}</p>
    </div>
  );
}

SeminarsListItem.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
};

export default SeminarsListItem;
