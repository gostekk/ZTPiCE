import { Meteor } from 'meteor/meteor';

import { Materials } from '../materials';

Meteor.publish('materials', function materials() {
  return Materials.find();
});

Meteor.publish('material.edit', function materialEdit(_id) {
  return Materials.find({ _id, userId: this.userId });
});
