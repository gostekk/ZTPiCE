import { Meteor } from 'meteor/meteor';

import { Seminars } from '../seminars';

Meteor.publish('seminars', function seminars() {
  return Seminars.find();
});
