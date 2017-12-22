import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker} from 'meteor/react-meteor-data';

import { Pages } from '../../../api/Pages/pages';

import EditPageButton from '../../components/EditPageButton/EditPageButton';
import Loading from '../../components/Loading/Loading';

const Contact = ({ loading, pageContent }) => (
  !loading ? (
    <div>
      <EditPageButton pageId={pageContent._id}/>
      <div dangerouslySetInnerHTML={{ __html: pageContent.body }} />
    </div>
  ) : <Loading />
);

export default withTracker(() => {
  const subscription = Meteor.subscribe('pages');
  return {
    loading: !subscription.ready(),
    pageContent: Pages.findOne({title: 'contact'}),
  }
})(Contact);
