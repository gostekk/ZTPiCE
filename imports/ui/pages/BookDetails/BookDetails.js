import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker} from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var'

import { Books } from '../../../api/Books/books';

import BookInfo from '../../components/BookInfo/BookInfo';
import BookEdit from '../../components/BookEdit/BookEdit';

class BookDetails extends React.Component {
  render () {
    if (this.props.loading) {
      return (
        <div>
          { !this.props.editModeValue
            ? <BookInfo history={this.props.history} book={this.props.book} editMode={this.props.editMode} />
            : <BookEdit history={this.props.history} book={this.props.book} editMode={this.props.editMode} /> }
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

const editMode = new ReactiveVar(false);

export default withTracker(({ match }) => {
  const subscription = Meteor.subscribe('book.details', match.params.id);
  return {
    editMode: editMode,
    editModeValue: editMode.get(),
    loading: subscription.ready(),
    book: Books.findOne(match.params.id),
  }
})(BookDetails);
