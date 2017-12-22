import React from 'react';
import { Meteor } from 'meteor/meteor';

class AddSeminar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: '',
      date: '',
      title: '',
    };
  }

  onSubmit (e) {
    e.preventDefault();

    const seminar = {
      title: this.state.title,
      date: this.state.date,
    }

    Meteor.call('seminars.insert', seminar, (err, res) => {
      if (!err) {
        this.setState({ error: '', title: '', date: ''});
      } else {
        this.setState({ error: err.reason });
      }
    });
  }

  onTitleChange (e) {
    this.setState({
      title: e.target.value,
    });
  }

  onDateChange (e) {
    this.setState({
      date: e.target.value,
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
