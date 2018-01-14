import React from 'react';

class MaterialAdd extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: '',
      description: '',
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    const description = this.state.description ? this.state.description : undefined;

    Meteor.call('materials.insert', description, (error, _id) => {
      if (error) {
        console.log(error.reason);
        this.setState({
          error: error.reason,
        });
      } else {
        this.setState({
          error: '',
          description: '',
        });
        console.log('Material added!');
      }
    });
  }

  handleDescriptionChange (e) {
    const description = e.target.value;

    this.setState({
      description
    });
  }

  render () {
    return (
      <div>
        <form ref={form => (this.form = form)} onSubmit={ this.handleSubmit.bind(this) }>
          { this.state.error ? <p>{this.state.error}</p> : undefined }
          <label>Description</label>
          <textarea
            value={ this.state.description }
            placeholder="Your note here."
            onChange={ this.handleDescriptionChange.bind(this) }>
          </textarea>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default MaterialAdd;
