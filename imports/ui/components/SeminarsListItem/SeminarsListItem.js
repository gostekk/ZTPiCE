import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ReactiveVar } from 'meteor/reactive-var'
import { withTracker} from 'meteor/react-meteor-data';

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
        date: moment(this.props.date).format('YYYY-MM-DD'),
        title: this.props.title,
        nameDisplayed: this.props.nameDisplayed,
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

    Meteor.call('seminars.update', this.props._id, seminar, (err, res) => {
      if (!err) {
        this.props.editMode.set(false);
        this.setState({ error: '' });
      } else {
        this.setState({ error: err.reason });
      }
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
        <div onClick={() => this.props.editMode.set(true)}>
          <p>{ moment(this.props.date).format('DD.MM.YYYY') }</p>
          <p>{ this.props.nameDisplayed }</p>
          <h5>{ this.props.title }</h5>
          { this.props.authenticated ? (
            <button onClick={() => {
              Meteor.call('seminars.remove', this.props._id);
            }
            }>X</button>)
          : undefined }
        </div>
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
          </form>
        </div>
      );
    }
  }
}

SeminarsListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
  date: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  nameDisplayed: PropTypes.string.isRequired,
};

export default withTracker(({ editMode }) => {
  const editModeValue = editMode.get();
  return {
    editMode,
    editModeValue
  }
})(SeminarsListItem);
