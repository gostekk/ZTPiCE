import React from 'react';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';

import BookAdd from '../../components/BookAdd/BookAdd';
import BooksList from '../../components/BooksList/BooksList';
import BooksListFilters from '../../components/BooksListFilters/BooksListFilters';

const showMyBooks = new ReactiveVar(false);

const Library = (props) => {
  return (
    <div>
      Library
      <BookAdd />
      <BooksListFilters showMyBooks={showMyBooks}/>
      <BooksList showMyBooks={showMyBooks} {...props}/>
    </div>
  );
}

export default Library;
