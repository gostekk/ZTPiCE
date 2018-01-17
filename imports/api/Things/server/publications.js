import { Meteor } from 'meteor/meteor';

import { Things } from '../things';

Meteor.publish('things', function things() {
  if (Roles.userIsInRole(this.userId, ['staff', 'admin'])) {
    return Things.find();
  }

  this.stop();
  return;
});

Meteor.publish('thing.details', function thingDetails(_id) {
  if (Roles.userIsInRole(this.userId, ['staff', 'admin'])) {
    return Things.find({ _id });
  }

  this.stop();
  return;
});
