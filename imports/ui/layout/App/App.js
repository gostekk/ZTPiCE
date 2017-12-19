import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import Authenticated from '../../components/Authenticated/Authenticated';
import Public from '../../components/Public/Public';
import Index from '../../pages/Index/Index';
import Login    from '../../pages/Login/Login';
import AddUser   from '../../pages/AddUser/AddUser';
import NotFound from '../../pages/NotFound/NotFound';

const App = (props) => (
  <Router>
    <div>
      <Switch>
        <Route exact name="index" path="/" component={Index} />
        <Public exact path="/login" redirectPath="/" component={Login} {...props} />
        <Authenticated exact path="/something" component={Index} {...props} />
        <Route exact path="/adduser" component={AddUser} {...props} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  </Router>
);

App.defaultProps = {
  userId: '',
};

App.propTypes = {
  userId: PropTypes.string,
  authenticated: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const authenticated = !!Meteor.userId();
  const userId = Meteor.userId();
  return {
    authenticated,
    userId,
  };
})(App);
