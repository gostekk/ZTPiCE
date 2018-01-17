import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Pages } from '../../../api/Pages/pages';

import EditPageButton from '../../components/EditPageButton/EditPageButton';
import Loading from '../../components/Loading/Loading';

const Conferences = ({ authAdmin, loading, pageContent }) => (
  !loading ? (
    <div>
      { authAdmin ? <EditPageButton pageId={pageContent._id}/> : undefined }
      <div dangerouslySetInnerHTML={{ __html: pageContent.body }} />
    </div>
  ) : <Loading />
);

Conferences.propTypes = {
  authAdmin: PropTypes.bool.isRequired,
  pageContent: PropTypes.object,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('pages');
  const userId = Meteor.userId();
  return {
    authAdmin: !!userId && Roles.userIsInRole(userId, 'admin'),
    loading: !subscription.ready(),
    pageContent: Pages.findOne({title: 'conferences'}),
  }
})(Conferences);
