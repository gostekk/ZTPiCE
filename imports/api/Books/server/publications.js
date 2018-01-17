import { Meteor } from 'meteor/meteor';

import { Books } from '../books';

Meteor.publish('books', function books() {
  if (Roles.userIsInRole(this.userId, ['staff', 'admin'])) {
    return Books.find();
  }

  this.stop();
  return;
});

Meteor.publish('book.details', function bookDetails(_id) {
  if (Roles.userIsInRole(this.userId, ['staff', 'admin'])) {
    return Books.find({ _id });
  }
  this.stop();
  return;
});
