import React from 'react';
import PropTypes from 'prop-types';
import { ReactiveVar } from 'meteor/reactive-var'

const BookInfo = ({ history, book, editMode }) => {
  return (
    <div>
      <button onClick={() => history.go(-1)}>Back</button>
      <button onClick={() => editMode.set(true)}>Edit</button>
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
  editMode: PropTypes.object.isRequired,
};

export default BookInfo;
