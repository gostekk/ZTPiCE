import { Pages } from '../pages';
import moment from 'moment';

// Init Contact page
const contact = Pages.findOne({title: 'contact'});
if (!contact) {
  Pages.insert({
    title: 'contact',
    body: '<h1>Contact<h1><p>text from contact</p>',
    createdAt: new Date(),
    updatedAt: moment().valueOf(),
  });
}

// Init Seminar page
const seminar = Pages.findOne({title: 'seminar'});
if (!seminar) {
  Pages.insert({
    title: 'seminar',
    body: '<h1>Seminar<h1><p>text from seminar</p>',
    createdAt: new Date(),
    updatedAt: moment().valueOf(),
  });
}

// Init Conferences page
const conferences = Pages.findOne({title: 'conferences'});
if (!conferences) {
  Pages.insert({
    title: 'conferences',
    body: '<h1>Conferences<h1><p>text from conferences</p>',
    createdAt: new Date(),
    updatedAt: moment().valueOf(),
  });
}
