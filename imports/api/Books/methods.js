import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import { Books } from './books';

Meteor.methods({
  'books.insert': function booksInsert(book) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      title: {
        type: String,
      },
      author: {
        type: String,
      },
      publicationDate: {
        type: Date,
      },
      publisher: {
        type: String,
      },
      numberOfPages: {
        type: Number,
        min: 1,
        max: 9999,
      },
      isbn: {
        type: String,
      }
    }).validate({
      ...book,
    });

    try {
      return Books.insert({ createdAt: new Date(), owner: undefined , ...book });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },

  'books.remove': function booksRemove(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      }
    }).validate({
      _id
    });

    try {
      return Books.remove(_id);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
});
