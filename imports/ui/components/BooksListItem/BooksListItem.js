import React from 'react';
import PropTypes from 'prop-types';
import { withTracker} from 'meteor/react-meteor-data';

const BooksListItem = ({ _id, title, author, owner, ownerData}) => {
  const ownerNameDisplayed = 'Undefined';

  if (ownerData) {
    ownerNameDisplayed = ownerData.info ? ownerData.info.nameDisplayed : 'Undefined';
  }

  return (
    <div>
      <h4>{ title }</h4>
      <h5>{ author }</h5>
      <p>{ owner ? `${ownerNameDisplayed}` : 'Undefined' }</p>
      <button onClick={() => {
        Meteor.call('book.changeOwner', _id, Meteor.userId());
      }
      }>Change Owner</button>
      <button onClick={() => {
        Meteor.call('book.remove', _id);
      }
      }>Delete</button>
    </div>
  );
}

BooksListItem.propTypes = {
  book: PropTypes.object,
};

export default withTracker(({ owner }) => {
  const subscription = Meteor.subscribe("userList");
  return {
    loading: !subscription.ready(),
    ownerData: Meteor.users.findOne(owner),
  }
})(BooksListItem);
