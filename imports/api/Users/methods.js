import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  'user.create': function (user, roles) {
    if (!Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized', 'Must be authorized to add new user!');
    }

    const id = Accounts.createUser(user);

    if(roles.admin) {
      Roles.addUsersToRoles(id, 'admin');
    }
    if(roles.staff) {
      Roles.addUsersToRoles(id, 'staff');
    }
  },
});
