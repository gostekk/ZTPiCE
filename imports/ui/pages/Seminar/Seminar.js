import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker} from 'meteor/react-meteor-data';

import { Pages } from '../../../api/Pages/pages';

import AddSeminar from '../../components/AddSeminar/AddSeminar';
import EditPageButton from '../../components/EditPageButton/EditPageButton';
import Loading from '../../components/Loading/Loading';

const Seminar = ({ loading, pageContent }) => (
  !loading ? (
    <div>
      <EditPageButton pageId={pageContent._id}/>
      <div dangerouslySetInnerHTML={{ __html: pageContent.body }} />
      <AddSeminar />
    </div>
  ) : <Loading />
);

export default withTracker(() => {
  const subscription = Meteor.subscribe('pages');
  return {
    loading: !subscription.ready(),
    pageContent: Pages.findOne({title: 'seminar'}),
  }
})(Seminar);
