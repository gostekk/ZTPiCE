import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker} from 'meteor/react-meteor-data';

import { Pages } from '../../../api/Pages/pages';

import AddSeminar from '../../components/AddSeminar/AddSeminar';
import EditPageButton from '../../components/EditPageButton/EditPageButton';
import Loading from '../../components/Loading/Loading';

const Seminar = ({ authenticated, loading, pageContent }) => (
  !loading ? (
    <div>
      { authenticated ? <EditPageButton pageId={pageContent._id}/> : undefined }
      <div dangerouslySetInnerHTML={{ __html: pageContent.body }} />
      { authenticated ? <AddSeminar/> : undefined }
    </div>
  ) : <Loading />
);

export default withTracker(() => {
  const subscription = Meteor.subscribe('pages');
  const userId = Meteor.userId();
  return {
    authenticated: !!userId,
    loading: !subscription.ready(),
    pageContent: Pages.findOne({title: 'seminar'}),
  }
})(Seminar);
