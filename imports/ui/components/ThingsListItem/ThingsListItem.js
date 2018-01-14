import React from 'react';
import PropTypes from 'prop-types';
import { withTracker} from 'meteor/react-meteor-data';

const ThingsListItem = ({ _id, serialNumber, inventoryNumber, description, owner, ownerData }) => {
  const ownerNameDisplayed = 'Undefined';

  if (ownerData) {
    ownerNameDisplayed = ownerData.info ? ownerData.info.nameDisplayed : 'Undefined';
  }

  return (
    <div>
      <h4>{ serialNumber }</h4>
      <h5>{ inventoryNumber }</h5>
      <p>{ description }</p>
      <p>{ owner ? `${ownerNameDisplayed}` : 'Undefined' }</p>
      <button onClick={() => {
        Meteor.call('things.changeOwner', _id, Meteor.userId());
      }
      }>Change Owner</button>
      <button onClick={() => {
        Meteor.call('things.remove', _id);
      }
      }>Delete</button>
    </div>
  );
}

ThingsListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  serialNumber: PropTypes.string.isRequired,
  inventoryNumber: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  owner: PropTypes.string,
};

export default withTracker(({ owner }) => {
  const subscription = Meteor.subscribe("userList");
  return {
    loading: !subscription.ready(),
    ownerData: Meteor.users.findOne(owner),
  }
})(ThingsListItem);
