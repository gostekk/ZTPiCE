import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ReactiveVar } from 'meteor/reactive-var'
import { withTracker} from 'meteor/react-meteor-data';

import SeminarsListItemInfo from '../../components/SeminarsListItemInfo/SeminarsListItemInfo';

class SeminarsListItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: '',
      date: '',
      title: '',
      nameDisplayed: '',
    };
  }

  componentDidMount () {
    if (!this.props.editModeValue) {
      this.setState({
        date: moment(this.props.seminar.date).format('YYYY-MM-DD'),
        title: this.props.seminar.title,
        nameDisplayed: this.props.seminar.nameDisplayed,
      });
    }
  }

  onSubmit (e) {
    e.preventDefault();

    const seminar = {
      date: moment(this.state.date).toDate(),
      title: this.state.title,
      nameDisplayed: this.state.nameDisplayed,
    }

    Meteor.call('seminars.update', this.props.seminar._id, seminar, (err, res) => {
      if (!err) {
        this.props.editMode.set(false);
        this.setState({ error: '' });
      } else {
        this.setState({ error: err.reason });
      }
    });
  }

  onCancel (e) {
    this.props.editMode.set(false);
    this.setState({
      date: moment(this.props.seminar.date).format('YYYY-MM-DD'),
      title: this.props.seminar.title,
      nameDisplayed: this.props.seminar.nameDisplayed,
    });
  }

  onDateChange (e) {
    this.setState({
      date: e.target.value,
    });
  }

  onTitleChange (e) {
    this.setState({
      title: e.target.value,
    });
  }

  onNameDisplayedChange (e) {
    this.setState({
      nameDisplayed: e.target.value,
    });
  }

  render () {
    if (!this.props.editModeValue) {
      return (
        <SeminarsListItemInfo
          authAdmin={this.props.authAdmin}
          editMode={this.props.editMode}
          editOnClickValue={this.props.editOnClickValue}
          {...this.props.seminar}
        />
      );
    } else {
      return (
        <div>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)}>
            <input
              type = "text"
              placeholder = "nameDisplayed"
              ref = "nameDisplayed"
              value = { this.state.nameDisplayed }
              onChange = { this.onNameDisplayedChange.bind(this) }
            />
            <input
              type = "text"
              placeholder = "Title"
              ref = "title"
              value = { this.state.title }
              onChange = { this.onTitleChange.bind(this) }
            />
            <input
              type = "date"
              placeholder = "DD.MM.YYYY"
              ref = "date"
              value = { this.state.date }
              onChange = { this.onDateChange.bind(this) }
            />
            <button>Save</button>
            <button onClick={this.onCancel.bind(this)}>Cancel</button>
          </form>
        </div>
      );
    }
  }
}

SeminarsListItem.propTypes = {
  authAdmin: PropTypes.bool.isRequired,
  editMode: PropTypes.object.isRequired,
  editModeValue: PropTypes.bool.isRequired,
  editOnClickValue: PropTypes.bool.isRequired,
  seminar: PropTypes.object.isRequired,
};

export default withTracker(({ editMode }) => {
  const editModeValue = editMode.get();
  return {
    editModeValue
  }
})(SeminarsListItem);
