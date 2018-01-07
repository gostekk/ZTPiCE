import React from 'react';
import { ReactiveVar } from 'meteor/reactive-var';
import PropTypes from 'prop-types';

class SeminarsFilters extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      editOnClick: false,
    };
  }

  render () {
    return (
      <div>
        <label>
          <input type="checkbox" checked={this.state.editOnClick} onChange={(e) => {
            this.setState({ editOnClick: !this.state.editOnClick});
            this.props.editOnClick.set(!this.state.editOnClick);
          }}/>
          edit on click
        </label>
      </div>
    );
  }
};

SeminarsFilters.propTypes = {
  editOnClick: PropTypes.object.isRequired,
};

export default SeminarsFilters;
