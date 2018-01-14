import { Meteor } from 'meteor/meteor';

import { Things } from '../things';

Meteor.publish('things', function things() {
  return Things.find();
});

Meteor.publish('thing.details', function thingDetails(_id) {
  return Things.find({ _id });
});
