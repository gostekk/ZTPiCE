import React from 'react';
import PropTypes from 'prop-types';

const BookInfo = ({ history, book }) => {
  return (
    <div>
      <button onClick={() => history.go(-1)}>Back</button>
      <p>Title: { book.title }</p>
      <p>Author: { book.author }</p>
      <p>Publisher: { book.publisher }</p>
      <p>ISBN: { book.isbn }</p>
      <p>Number of pages: { book.numberOfPages }</p>
    </div>
  );
}

BookInfo.propTypes = {
  book: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default BookInfo;
