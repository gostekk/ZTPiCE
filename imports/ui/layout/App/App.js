import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

// Components
import Authenticated from '../../components/Authenticated/Authenticated';
import Public from '../../components/Public/Public';
import Navigation from '../../components/Navigation/Navigation';

// Public
import Login from '../../pages/Login/Login';

// Authenticated
import AddUser from '../../pages/AddUser/AddUser';
import BookDetails from '../../pages/BookDetails/BookDetails';
import EditPage from '../../pages/EditPage/EditPage';
import Library from '../../pages/Library/Library';
import Stock from '../../pages/Stock/Stock';
import UsersList from '../../pages/UsersList/UsersList';

// Route
import Index from '../../pages/Index/Index';
import Conferences from '../../pages/Conferences/Conferences';
import Contact from '../../pages/Contact/Contact';
import Didactics from '../../pages/Didactics/Didactics';
import Seminar from '../../pages/Seminar/Seminar';
import Staff from '../../pages/Staff/Staff';
import NotFound from '../../pages/NotFound/NotFound';

const App = (props) => (
  <Router>
    <div>
      <Navigation {...props}/>
      <Switch>
        <Route exact name="index" path="/" component={Index} />
        <Public exact path="/login" redirectPath="/" component={Login} {...props} />

        <Route exact path="/adduser" component={AddUser} {...props} />
        <Authenticated exact path="/pages/:id" component={EditPage} {...props} />
        <Authenticated exact path="/library" component={Library} {...props} />
        <Authenticated exact path="/library/:id" component={BookDetails} {...props} />
        <Authenticated exact path="/stock" component={Stock} {...props} />
        <Authenticated exact path="/users" component={UsersList} {...props} />

        <Route exact path="/conferences" component={Conferences} {...props} />
        <Route exact path="/contact" component={Contact} {...props} />
        <Route exact path="/didactics" component={Didactics} {...props} />
        <Route exact path="/seminar" component={Seminar} {...props} />
        <Route exact path="/staff" component={Staff} {...props} />

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
  const userId = Meteor.userId();
  return {
    authenticated: !!userId,
    userId,
  };
})(App);
