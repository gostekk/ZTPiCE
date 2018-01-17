import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

import { Seminars } from './seminars';

Meteor.methods({
  'seminars.insert': function seminarsInsert(seminar) {
    if (!Roles.userIsInRole(this.userId, ['staff', 'admin'])) {
      throw new Meteor.Error('not-authorized');
    }

    const title = seminar.title;
    const date = moment(seminar.date).toDate();
    const nameDisplayed = seminar.nameDisplayed;

    new SimpleSchema({
      date: {
        type: Date,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      nameDisplayed: {
        type: String,
        required: true,
      },
    }).validate({
      date,
      title,
      nameDisplayed,
    });

    return Seminars.insert({
      date: date,
      title: title,
      nameDisplayed: nameDisplayed,
      userId: this.userId,
      createdAt: new Date(),
    });
  },

  'seminars.remove': function seminarsRemove( _id) {
    if (!Roles.userIsInRole(this.userId, ['staff', 'admin'])) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      }
    }).validate({ _id });

    Seminars.remove({ _id });
  },

  'seminars.update': function seminarsUpdate(_id, updates) {
    if (!Roles.userIsInRole(this.userId, ['staff', 'admin'])) {
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
      date: {
        type: Date,
        optional: true,
      },
      nameDisplayed: {
        type: String,
        optional: true,
      }
    }).validate({
      _id,
      ...updates,
    });

    Seminars.update({
      _id,
    }, {
      $set: {
        ...updates,
      },
    });
  },
});
