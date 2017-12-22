import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      email: '',
      password: '',
      repassword: '',
      nameDisplayed: '',
      name: '',
      surname: '',
      position: '',
      phone: '',
      room: '',
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const email = this.state.email.trim();
    const password = this.state.password.trim();
    const repassword = this.state.repassword.trim();

    if (!(password === repassword)) {
      return this.setState({ error: 'Passwords are not identical!', password: '', repassword: ''})
    }

    if (password.length < 9) {
      return this.setState({ error: 'Password must me more than 8 characters long.', password: '' })
    }

    const profile = {
      nameDisplayed : this.state.nameDisplayed.trim(),
      name : this.state.name.trim(),
      surname : this.state.surname.trim(),
      position : this.state.position.trim(),
      phone : this.state.phone.trim(),
      room : this.state.room.trim(),
    };

    Meteor.call('user.create', {email, password, profile}, (err, res) => {
      if (err) {
        this.setState({
          error: err.reason,
          password: '',
          repassword: '',
        });
      } else {
        this.setState({
          error: 'gud',
          email: '',
          password: '',
          repassword: '',
          nameDisplayed: '',
          name: '',
          surname: '',
          position: '',
          phone: '',
          room: '',
        });
      }
    });
  }

  render () {
    return (
      <div>
        <div>
          <h1>Join</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate>
            <input
              type="email"
              ref="email"
              name="email"
              placeholder="Email"
              value={ this.state.email }
              onChange={ (e) => this.setState({email: e.target.value}) }
            />
            <input
              type="password"
              ref="password"
              name="password"
              placeholder="Password"
              value={ this.state.password }
              onChange={ (e) => this.setState({password: e.target.value}) }
            />
            <input
              type="password"
              ref="repassword"
              name="repassword"
              placeholder="Password confirm"
              value={ this.state.repassword }
              onChange={ (e) => this.setState({repassword: e.target.value}) }
            />
            <input
              type="text"
              ref="nameDisplayed"
              name="nameDisplayed"
              placeholder="Name displayed"
              value={ this.state.nameDisplayed }
              onChange={ (e) => this.setState({nameDisplayed: e.target.value}) }
            />
            <input
              type="text"
              ref="name"
              name="name"
              placeholder="Name"
              value={ this.state.name }
              onChange={ (e) => this.setState({name: e.target.value}) }
            />
            <input
              type="text"
              ref="surname"
              name="surname"
              placeholder="Surname"
              value={ this.state.surname }
              onChange={ (e) => this.setState({surname: e.target.value}) }
            />
            <input
              type="text"
              ref="position"
              name="position"
              placeholder="Position"
              value={ this.state.position }
              onChange={ (e) => this.setState({position: e.target.value}) }
            />
            <input
              type="text"
              ref="phone"
              name="phone"
              placeholder="Phone"
              value={ this.state.nphone }
              onChange={ (e) => this.setState({phone: e.target.value}) }
            />
            <input
              type="number"
              ref="room"
              name="room"
              placeholder="Room number"
              value={ this.state.room }
              onChange={ (e) => this.setState({room: e.target.value}) }
            />
            <button>Create Account</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddUser;
