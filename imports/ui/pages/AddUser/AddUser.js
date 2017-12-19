import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      email: '',
      password: '',
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const email = this.state.email.trim();
    const password = this.state.password.trim();

    if (password.length < 9) {
      return this.setState({ error: 'Password must me more than 8 characters long.', password: '' })
    }

    Accounts.createUser({ email, password }, (err, res) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: 'gud', email: '', password: '' });
      }
    });
  }

  onEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onPasswordChange(e) {
    this.setState({
      password: e.target.value,
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
              onChange={ this.onEmailChange }
            />
            <input
              type="password"
              ref="password"
              name="password"
              placeholder="Password"
              value={ this.state.password }
              onChange={ this.onPasswordChange }
            />
            <button>Create Account</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddUser;
