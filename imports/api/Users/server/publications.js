import { Meteor } from 'meteor/meteor';

Meteor.publish("userList", function () {
  return Meteor.users.find({},
  {
    fields: {
      emails: 1,
      info: 1,
    }
  });
});
