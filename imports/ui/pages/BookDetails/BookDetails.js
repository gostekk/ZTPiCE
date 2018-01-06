import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker} from 'meteor/react-meteor-data';

import { Books } from '../../../api/Books/books';

class BookDetails extends React.Component {
  render () {
    if (this.props.loading) {
      return (
        <div>
          <button onClick={() => this.props.history.go(-1)}>Back</button>
          <p>Title: { this.props.book.title }</p>
          <p>Author: { this.props.book.author }</p>
          <p>Publisher: { this.props.book.publisher }</p>
          <p>ISBN: { this.props.book.isbn }</p>
          <p>Number of pages: { this.props.book.numberOfPages }</p>
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
