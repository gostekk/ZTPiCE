import React from 'react';
import PropTypes from 'prop-types';
import { withTracker} from 'meteor/react-meteor-data';

import { Materials } from '../../../api/Materials/materials';

import MaterialsListItem from '../../components/MaterialsListItem/MaterialsListItem';
import Loading from '../../components/Loading/Loading';

const MaterialsList = ({ loading, materials, history }) => {
  if (loading) {
    return (
      <div>
        { materials.map((material) =>
          <MaterialsListItem key={material._id} {...material} history={history} />
        )}
      </div>
    );
  } else {
    return <Loading />;
  }
}

export default withTracker(() => {
  const subscription = Meteor.subscribe('materials');
  return {
    loading: subscription.ready(),
    materials: Materials.find().fetch(),
  }
})(MaterialsList);
