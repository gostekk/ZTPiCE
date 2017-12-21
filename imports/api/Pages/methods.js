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
  }
});
