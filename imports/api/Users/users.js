import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';

export const onCreateUser = (options, user) => {
  if ( options.profile ) {
    user.info = options.profile;
  }

  return user;
}

Accounts.onCreateUser(onCreateUser);

export const validateNewUser = (user) => {
  // NOTE: check if user is logged in
  // if (!Meteor.userId()) {
  //   throw new Meteor.Error('not-authorized', 'Must be authorized to add new user!');
  // }
  
  const email = user.emails[0].address;

  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
    },
  }).validate({ email });

  return true;
}

Accounts.validateNewUser(validateNewUser);
