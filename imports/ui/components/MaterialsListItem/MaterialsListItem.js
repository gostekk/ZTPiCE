import React from 'react';
import PropTypes from 'prop-types';
import { withTracker} from 'meteor/react-meteor-data';

import MaterialEditButton from '../../components/MaterialEditButton/MaterialEditButton';
import Loading from '../../components/Loading/Loading';

const MaterialsListItem = ({ loading, _id, description, owner, ownerData, history}) => {
  if ( !loading ) {
    return (
      <div>
        { ownerData.info.nameDisplayed ? <h5>{ ownerData.info.nameDisplayed }</h5> : <h5>Undefined</h5>}
        <div dangerouslySetInnerHTML={{ __html: description }} />

        { owner ? <MaterialEditButton materialId={_id}/> : undefined }
        { owner
          ? <button onClick={() => Meteor.call('materials.remove', _id)}>Remove</button>
          : undefined }
      </div>
    );
  } else {
    return <Loading />;
  }
}

MaterialsListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  desciption: PropTypes.string,
  owner: PropTypes.bool.isRequired,
};

export default withTracker(({ userId }) => {
  const subscription = Meteor.subscribe("userList");
  return {
    loading: !subscription.ready(),
    owner: userId === Meteor.userId()
    ? true
    : false,
    ownerData: Meteor.users.findOne(userId),
  }
})(MaterialsListItem);
