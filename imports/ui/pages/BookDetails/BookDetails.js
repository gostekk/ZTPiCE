import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker} from 'meteor/react-meteor-data';

import { Books } from '../../../api/Books/books';

import BookInfo from '../../components/BookInfo/BookInfo';
import BookEdit from '../../components/BookEdit/BookEdit';

class BookDetails extends React.Component {
  render () {
    if (this.props.loading) {
      return (
        <div>
          <BookInfo history={this.props.history} book={this.props.book} />
          <BookEdit history={this.props.history} book={this.props.book} />
        </div>
      );
    } else {
      return (
        <div>
          Loading
        </div>
      );
    }
  }
}

export default withTracker(({ match }) => {
  const subscription = Meteor.subscribe('book.details', match.params.id);
  return {
    loading: subscription.ready(),
    book: Books.findOne(match.params.id),
  }
})(BookDetails);
