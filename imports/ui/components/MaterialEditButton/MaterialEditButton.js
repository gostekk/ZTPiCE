import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MaterialEditButton = ({ materialId }) => {
  return (
    <Link to={`/didactics/edit/${materialId}`}>
      <button>
        Edit
      </button>
    </Link>
  );
}

MaterialEditButton.propTypes = {
  materialId: PropTypes.string.isRequired,
}

export default MaterialEditButton;
