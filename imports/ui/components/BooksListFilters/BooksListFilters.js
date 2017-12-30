import React from 'react';
import { ReactiveVar } from 'meteor/reactive-var';

class BooksListFilters extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showMyBooks: true,
    };
  }

  render () {
    return (
      <div>
        <label>
          <input type="checkbox" checked={!this.state.showMyBooks} onChange={(e) => {
            this.setState({ showMyBooks: !e.target.checked});
            this.props.showMyBooks.set(this.state.showMyBooks);
          }}/>
          show my books
        </label>
      </div>
    );
  }
};

export default BooksListFilters;
