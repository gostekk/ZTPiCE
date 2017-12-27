import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

import { Seminars } from './seminars';

Meteor.methods({
  'seminars.insert': function seminarsInsert(seminar) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const title = seminar.title;
    const date = moment(seminar.date).toDate();

    new SimpleSchema({
      title: {
        type: String,
      },
      date: {
        type: Date,
      }
    }).validate({
      title,
      date,
    });

    return Seminars.insert({
      title: title,
      userId: this.userId,
      date: date,
      createdAt: new Date(),
    });
  },
  'seminars.remove': function seminarsRemove( _id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      }
    }).validate({ _id });

    Seminars.remove({ _id });
  }
});
