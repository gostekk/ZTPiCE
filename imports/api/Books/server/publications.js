import { Meteor } from 'meteor/meteor';

import { Books } from '../books';

Meteor.publish('books', function books() {
  return Books.find();
});

Meteor.publish('book.details', function bookDetails(_id) {
  return Books.find({ _id });
});
