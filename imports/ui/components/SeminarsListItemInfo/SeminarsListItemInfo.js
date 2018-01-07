import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const SeminarsListItemInfo = ({ authenticated, _id, date, title, nameDisplayed, editMode, editOnClickValue}) => {
  return (
    <div onClick={() => editOnClickValue ? editMode.set(true) : true }>
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

SeminarsListItemInfo.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  _id: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  nameDisplayed: PropTypes.string.isRequired,
  editMode: PropTypes.object.isRequired,
  editOnClickValue: PropTypes.bool.isRequired,
};

export default SeminarsListItemInfo;
