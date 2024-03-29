import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import { Things } from './things';

Meteor.methods({
  'things.insert': function thingsInsert(thing) {
    if (!Roles.userIsInRole(this.userId, ['staff', 'admin'])) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      serialNumber: {
        type: String,
        required: true,
      },
      inventoryNumber: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    }).validate({
      ...thing,
    });

    return Things.insert({ createdAt: new Date(), owner: this.userId , ...thing });
  },

  'things.remove': function thingsRemove(_id) {
    if (!Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      }
    }).validate({
      _id
    });

    Things.remove(_id);
  },

  'things.changeOwner': function thingsChangeOwner(thingId, userId) {
    if (!Roles.userIsInRole(this.userId, ['staff', 'admin'])) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      thingId: {
        type: String,
        min: 1
      },
      userId: {
        type: String,
        min: 1
      }
    }).validate({ thingId, userId });

    Things.update({
      _id: thingId,
    }, {
      $set: {
        owner: userId,
      }
    });
  },

  'things.update': function thingsInsert(_id, updates) {
    if (!Roles.userIsInRole(this.userId, ['staff', 'admin'])) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
      serialNumber: {
        type: String,
        optional: true,
      },
      inventoryNumber: {
        type: String,
        optional: true,
      },
      description: {
        type: String,
        optional: true,
      },
    }).validate({
      _id,
      ...updates,
    });

    return Things.update({
      _id
    }, {
      $set: {
        ...updates,
      },
    });
  },
});
