import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Pages } from '../../../api/Pages/pages';

import AddSeminar from '../../components/AddSeminar/AddSeminar';
import EditPageButton from '../../components/EditPageButton/EditPageButton';
import Loading from '../../components/Loading/Loading';
import SeminarsFilters from '../../components/SeminarsFilters/SeminarsFilters';
import SeminarsList from '../../components/SeminarsList/SeminarsList';

const Seminar = ({ authAdmin, authenticated, editOnClick, editOnClickValue, loading, pageContent }) => (
  !loading ? (
    <div>
      { authAdmin ? <EditPageButton pageId={pageContent._id}/> : undefined }
      <div dangerouslySetInnerHTML={{ __html: pageContent.body }} />
      { authenticated ? <AddSeminar/> : undefined }
      { authenticated ? <SeminarsFilters editOnClick={editOnClick} /> : undefined }

      <SeminarsList authAdmin={authAdmin} editOnClickValue={editOnClickValue}/>
    </div>
  ) : <Loading />
);

Seminar.propTypes = {
  authAdmin: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  editOnClick: PropTypes.object.isRequired,
  editOnClickValue: PropTypes.bool.isRequired,
  pageContent: PropTypes.object,
};

const editOnClick = new ReactiveVar(false);

export default withTracker(() => {
  const subscription = Meteor.subscribe('pages');
  const userId = Meteor.userId();
  const editOnClickValue = editOnClick.get();
  return {
    authAdmin: !!userId && Roles.userIsInRole(userId, 'admin'),
    authenticated: !!userId && Roles.userIsInRole(userId, ['staff', 'admin']),
    editOnClick: editOnClick,
    editOnClickValue,
    loading: !subscription.ready(),
    pageContent: Pages.findOne({title: 'seminar'}),
  }
})(Seminar);
