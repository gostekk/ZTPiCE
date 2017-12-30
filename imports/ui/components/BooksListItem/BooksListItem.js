import React from 'react';
import PropTypes from 'prop-types';

const BooksListItem = (book) => {
  console.log(book);
  return (
    <div>
      <h4>{ book.title }</h4>
      <h5>{ book.author }</h5>
      <p>{ book.owner ? `${book.owner}` : 'Undefined' }</p>
    </div>
  );
}

BooksListItem.propTypes = {
  book: PropTypes.object,
};

export default BooksListItem;
