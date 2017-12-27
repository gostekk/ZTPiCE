import React from 'react';
import moment from 'moment';

const SeminarsListItem = ({ title, date }) => {
  return (
    <div>
      <h4>{title}</h4>
      <p>{moment(date).format('DD.MM.YYYY')}</p>
    </div>
  );
}

export default SeminarsListItem;
