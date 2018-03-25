import React from 'react';
import PropTypes from 'prop-types';
import { withTracker} from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';

const BooksListItem = ({ authAdmin, authenticated, _id, title, author, owner, nameDisplayed, history}) => {
    return (
      <div onDoubleClick={() => history.push(`/library/${_id}`)}>
        <h4>{ title }</h4>
        <h5>{ author }</h5>
        <p>{ owner ? nameDisplayed : 'Undefined' }</p>
        { authenticated
          ? <button onClick={() => Meteor.call('book.changeOwner', _id, Meteor.userId())
          }>Change Owner</button>
          : undefined}
        { authAdmin || Meteor.userId() === owner
          ? <button onClick={() => Meteor.call('book.remove', _id)}>Delete</button>
          : undefined }
      </div>
    );
}

BooksListItem.propTypes = {
  authAdmin: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  book: PropTypes.object,
};

const nameDisplayed = new ReactiveVar('Undefined');

export default withTracker(({ owner }) => {
  const nameDisplayedVar = nameDisplayed.get();

  Meteor.call('user.nameDisplayed', owner ,function (error, res) {
    nameDisplayed.set(res);
  });
  return {
    nameDisplayed: nameDisplayedVar,
  }
})(BooksListItem);
