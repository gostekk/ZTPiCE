import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  'user.create': function (user) {
    Accounts.createUser(user);
  }
});
