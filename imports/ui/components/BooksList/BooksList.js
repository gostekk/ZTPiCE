import React from 'react';
import PropTypes from 'prop-types';
import { ReactiveVar } from 'meteor/reactive-var';
import { withTracker} from 'meteor/react-meteor-data';

import { Books } from '../../../api/Books/books';

import BooksListItem from '../../components/BooksListItem/BooksListItem';
import Loading from '../../components/Loading/Loading';

const BooksList = ({ loading, books}) => {
  if (loading) {
    return (
      <div>
        BooksList
        { books.map((book) =>
          <BooksListItem key={book._id} {...book} />
        )}
      </div>
    );
  } else {
    return <Loading />;
  }
}

BooksList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
};

export default withTracker(({ showMyBooks }) => {
  const subscription = Meteor.subscribe('books');
  return {
    loading: subscription.ready(),
    books: showMyBooks.get()
    ? Books.find({owner: Meteor.userId()}).fetch()
    : Books.find().fetch(),
  }
})(BooksList);
