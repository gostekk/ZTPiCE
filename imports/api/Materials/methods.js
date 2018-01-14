import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

import { Materials } from './materials';

Meteor.methods({
  'materials.insert': function materialsInsert(description) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      description: {
        type: String,
        min: 1,
        required: true,
      },
    }).validate({
      description
    });

    return Materials.insert({
      description: description,
      userId: this.userId,
      createdAt: new Date(),
      updatedAt: moment().valueOf(),
    });
  },

  'materials.remove': function materialsRemove(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
    }).validate({
      _id
    });

    Materials.remove({ _id });
  },

  'materials.update': function (_id, description) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
      description: {
        type: String,
        required: true,
      },
    }).validate({
      _id,
      description,
    });

    Materials.update({
      _id,
    }, {
      $set: {
        updatedAt: moment().valueOf(),
        description,
      },
    });
  },
});
