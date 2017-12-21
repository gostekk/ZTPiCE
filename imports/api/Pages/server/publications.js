import { Meteor } from 'meteor/meteor';
import { Pages } from '../pages';

Meteor.publish('pages', function pages() {
  return Pages.find();
});
