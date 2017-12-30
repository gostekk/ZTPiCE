import React from 'react';
import { Meteor } from 'meteor/meteor';

class AddSeminar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: '',
      date: '',
      title: '',
      nameDisplayed: '',
    };
  }

  onSubmit (e) {
    e.preventDefault();

    const seminar = {
      date: this.state.date,
      title: this.state.title,
      nameDisplayed: this.state.nameDisplayed,
    }

    Meteor.call('seminars.insert', seminar, (err, res) => {
      if (!err) {
        this.setState({ error: '', title: '', date: '', nameDisplayed: '',});
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
    return (
      <div>
        <h1>Add Seminar</h1>
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
          <button>Add Seminar</button>
        </form>
      </div>
    );
  }
}

export default AddSeminar;
