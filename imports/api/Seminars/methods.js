import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

import { Seminars } from './seminars';

Meteor.methods({
  'seminars.insert': function seminarsInsert(seminar) {
    // if (!this.userId) {
    //   throw new Meteor.Error('not-authorized');
    // }

    const title = seminar.title;
    const date = moment(seminar.date).format('DD.MM.YYYY');

    console.log('seminars.insert', title, ' ', date);
    // return Seminars.insert({
    //   title: title,
    //   userId: this.userId,
    //   date: ,
    //   createdAt: new Date(),
    // });
  }
});
