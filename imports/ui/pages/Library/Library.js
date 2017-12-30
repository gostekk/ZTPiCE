import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Books } from '../../../api/Books/books';

import BookAdd from '../../components/BookAdd/BookAdd';

class Library extends React.Component {
  render () {
    return (
      <div>
        Library
        <BookAdd />
      </div>
    );
  }
}

Library.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('books');
  return {
    loading: subscription.ready(),
    books: Books.find().fetch(),
  }
})(Library);
