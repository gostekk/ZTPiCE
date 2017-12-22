import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const EditPageButton = ({ pageId }) => {
  return (
    <Link to={`/pages/${pageId}`}>
      <button>
        Edit
      </button>
    </Link>
  );
}

EditPageButton.propTypes = {
  pageId: PropTypes.string.isRequired,
}

export default EditPageButton;
