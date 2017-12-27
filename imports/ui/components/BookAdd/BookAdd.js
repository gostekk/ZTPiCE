import React from 'react';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

class BookAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

    const book = {
      title: this.state.title.trim(),
      author: this.state.author.trim(),
      publicationDate: moment(this.state.publicationDate, 'YYYY').toDate(),
      publisher: this.state.publisher.trim(),
      numberOfPages: this.state.numberOfPages,
      isbn: this.state.isbn,
    };

    Meteor.call('books.insert', book, (error, _id) => {
      if (error) {
        console.log(error.reason);
      } else {
        this.form.reset();
        console.log('Book added!');
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
      <form ref={form => (this.form = form)} onSubmit={ this.handleSubmit}>
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
    );
  }
};

export default BookAdd;
