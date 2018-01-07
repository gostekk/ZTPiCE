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

const Seminar = ({ authenticated, editOnClick, editOnClickValue, loading, pageContent }) => (
  !loading ? (
    <div>
      { authenticated ? <EditPageButton pageId={pageContent._id}/> : undefined }
      <div dangerouslySetInnerHTML={{ __html: pageContent.body }} />
      { authenticated ? <AddSeminar/> : undefined }
      { authenticated ? <SeminarsFilters editOnClick={editOnClick} /> : undefined }

      <SeminarsList authenticated={authenticated} editOnClickValue={editOnClickValue}/>
    </div>
  ) : <Loading />
);

Seminar.propTypes = {
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
    authenticated: !!userId,
    editOnClick: editOnClick,
    editOnClickValue,
    loading: !subscription.ready(),
    pageContent: Pages.findOne({title: 'seminar'}),
  }
})(Seminar);
