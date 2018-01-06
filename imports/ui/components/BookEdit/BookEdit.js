import React from 'react';
import PropTypes from 'prop-types';

class BookEdit extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: '',
      title: '',
      author: '',
      publicationDate: '',
      publisher: '',
      numberOfPages: '',
      isbn: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handlePublicationDateChange = this.handlePublicationDateChange.bind(this);
    this.handlePublisherChange = this.handlePublisherChange.bind(this);
    this.handleNumberOfPagesChange = this.handleNumberOfPagesChange.bind(this);
    this.handleIsbnChange = this.handleIsbnChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const title = this.state.title ? this.state.title.trim() : undefined;
    const author = this.state.author ? this.state.author.trim() : undefined;
    const publicationDate = this.state.publicationDate ? moment(this.state.publicationDate, 'YYYY').toDate() : undefined;
    const publisher = this.state.publisher ? this.state.publisher.trim() : undefined;
    const numberOfPages = this.state.numberOfPages ? this.state.numberOfPages : undefined;
    const isbn = this.state.isbn ? this.state.isbn : undefined;

    const updatedBook = {
      title,
      author,
      publicationDate,
      publisher,
      numberOfPages,
      isbn,
    };
    console.log(this.props.book._id);
    

    Meteor.call('books.update', this.props.book._id, updatedBook, (error, _id) => {
      if (error) {
        console.log(error.reason);
        this.setState({
          error: error.reason,
        });
      } else {
        this.setState({
          error: '',
          title: '',
          author: '',
          publicationDate: '',
          publisher: '',
          numberOfPages: '',
          isbn: '',
        });
        console.log('Book updated!');
      }
    });
  }

  handleTitleChange (e) {
    const title = e.target.value;

    this.setState({ title });
  }

  handleAuthorChange (e) {
    const author = e.target.value;
    this.setState({ author });
  }

  handlePublicationDateChange (e) {
    const publicationDate = Number(e.target.value);

    if (publicationDate > (new Date()).getFullYear()) {
      console.log('Maximum possible publication year is', (new Date()).getFullYear());
    } else if (typeof publicationDate === 'number' && !isNaN(publicationDate)) {
      this.setState({ publicationDate });
    }
  }

  handlePublisherChange (e) {
    const publisher = e.target.value;
    this.setState({ publisher });
  }

  handleNumberOfPagesChange (e) {
    const numberOfPages = Number(e.target.value);

    if (numberOfPages > 9999) {
      console.log('Maximum value is 9999 !');
    } else if (typeof numberOfPages === 'number' && !isNaN(numberOfPages)) {
      this.setState({ numberOfPages });
    }
  }

  handleIsbnChange (e) {
    const isbn = e.target.value.trim();
    this.setState({ isbn });
  }

  render () {
    return (
      <div>
        <form ref={form => (this.form = form)} onSubmit={ this.handleSubmit}>
          { this.state.error ? <p>{this.state.error}</p> : undefined }
          <label>Title</label>
          <input
            type="text"
            name="title"
            ref={title => (this.title = title)}
            placeholder="Book title"
            value={ this.state.title }
            onChange={ this.handleTitleChange }
          />
          <label>Author</label>
          <input
            type="text"
            name="author"
            ref={author => (this.author = author)}
            placeholder="Book author"
            value={ this.state.author }
            onChange={ this.handleAuthorChange }
          />
          <label>publicationDate</label>
          <input
            type="text"
            name="publicationDate"
            ref={publicationDate => (this.publicationDate = publicationDate)}
            placeholder="Publication date (yr)"
            value={ this.state.publicationDate }
            onChange={ this.handlePublicationDateChange }
          />
          <label>publisher</label>
          <input
            type="text"
            name="publisher"
            ref={publisher => (this.publisher = publisher)}
            placeholder="Publisher(Wydawca)"
            value={ this.state.publisher }
            onChange={ this.handlePublisherChange }
          />
          <label>numberOfPages</label>
          <input
            type="text"
            name="numberOfPages"
            ref={numberOfPages => (this.numberOfPages = numberOfPages)}
            placeholder="123"
            value={ this.state.numberOfPages }
            onChange={ this.handleNumberOfPagesChange }
          />
          <label>ISBN</label>
          <input
            type="text"
            name="isbn"
            ref={isbn => (this.isbn = isbn)}
            placeholder="xxx-xx-xxxx-xxx-x"
            value={ this.state.isbn }
            onChange={ this.handleIsbnChange }
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

BookEdit.propTypes = {
  book: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default BookEdit;
