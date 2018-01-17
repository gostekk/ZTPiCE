import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const handleClick = (authAdmin, userId, editMode, editOnClickValue) => {
  console.log(
    'authAdmin: ', authAdmin,
    '\nuserId: ', userId,
    '\nmeterId: ', Meteor.userId(),
    '\neditValue: ', editOnClickValue);
  if (editOnClickValue && (Meteor.userId() === userId || authAdmin)) {
    editMode.set(true);
  }
}

const SeminarsListItemInfo = ({
    authAdmin,
    _id,
    userId,
    date,
    title,
    nameDisplayed,
    editMode,
    editOnClickValue,
  }) => {

  return (
    <div onClick={ () => handleClick(authAdmin, userId, editMode, editOnClickValue) }>
      <p>{ moment(date).format('DD.MM.YYYY') }</p>
      <p>{ nameDisplayed }</p>
      <h5>{ title }</h5>
      { authAdmin || Meteor.userId() === userId ? (
        <button onClick={() => {
          Meteor.call('seminars.remove', _id);
        }
        }>X</button>)
      : undefined }
    </div>
  );
}

SeminarsListItemInfo.propTypes = {
  authAdmin: PropTypes.bool.isRequired,
  _id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  nameDisplayed: PropTypes.string.isRequired,
  editMode: PropTypes.object.isRequired,
  editOnClickValue: PropTypes.bool.isRequired,
};

export default SeminarsListItemInfo;
