import React from 'react';
import { Meteor } from 'meteor/meteor';

import BookAdd from '../../components/BookAdd/BookAdd';
import BooksList from '../../components/BooksList/BooksList';

const Library = () => {
  return (
    <div>
      Library
      <BookAdd />
      <BooksList />
    </div>
  );
}

export default Library;
