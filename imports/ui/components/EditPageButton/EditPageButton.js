import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

const EditPageButton = ({ authenticated, pageId }) => {
  if (authenticated) {
    return (<Link to={`/pages/${pageId}`}>
      <button>
        Edit
      </button>
    </Link>);
  } else {
  return null;
  }
}

EditPageButton.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  pageId: PropTypes.string.isRequired,
}

export default withTracker(() => {
  const userId = Meteor.userId();
  return {
    authenticated: !!userId,
  }
})(EditPageButton);
