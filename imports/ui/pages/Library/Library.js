import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { ReactiveVar } from 'meteor/reactive-var';
import { withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import BookAdd from '../../components/BookAdd/BookAdd';
import BooksList from '../../components/BooksList/BooksList';
import BooksListFilters from '../../components/BooksListFilters/BooksListFilters';

const showMyBooks = new ReactiveVar(false);

const Library = (props) => {
  return (
    <div>
      Library
      { props.authenticated ? <BookAdd /> : undefined}
      { props.authenticated ? <BooksListFilters showMyBooks={showMyBooks}/> : undefined}
      <BooksList showMyBooks={showMyBooks} {...props}/>
    </div>
  );
}

Library.propTypes = {
  authAdmin: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const userId = Meteor.userId();
  return {
    authAdmin: !!userId && Roles.userIsInRole(userId, 'admin'),
    authenticated: !!userId && Roles.userIsInRole(userId, ['staff', 'admin']),
  }
})(Library);
