import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

import { Pages } from './pages';

Meteor.methods({
  'pages.insert': function pagesInsert() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Pages.insert({
      title: '',
      body: '',
      createdAt: new Date(),
      updatedAt: moment().valueOf(),
    })
  },
  'pages.update': function (_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
      title: {
        type: String,
        optional: true,
      },
      body: {
        type: String,
        optional: true,
      }
    }).validate({
      _id,
      ...updates,
    });

    Pages.update({
      _id,
    }, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates,
      },
    });
  },
});
