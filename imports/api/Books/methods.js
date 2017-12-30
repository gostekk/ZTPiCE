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
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      publicationDate: {
        type: Date,
        optional: true,
      },
      publisher: {
        type: String,
        optional: true,
      },
      numberOfPages: {
        type: Number,
        min: 1,
        max: 9999,
        optional: true,
      },
      isbn: {
        type: String,
        required: true,
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

  'book.remove': function booksRemove(_id) {
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

  'book.changeOwner': function bookChangeOwner(bookId, userId) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      bookId: {
        type: String,
        min: 1
      },
      userId: {
        type: String,
        min: 1
      }
    }).validate({ bookId, userId });

    Books.update({
      _id: bookId,
    }, {
      $set: {
        owner: userId,
      }
    });
  },
});
