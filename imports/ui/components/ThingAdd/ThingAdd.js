import React from 'react';
import { Meteor } from 'meteor/meteor';

class ThingAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      serialNumber: '',
      inventoryNumber: '',
      description: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSerialChange = this.handleSerialChange.bind(this);
    this.handleInventoryChange = this.handleInventoryChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const serialNumber = this.state.serialNumber ? this.state.serialNumber.trim() : undefined;
    const inventoryNumber = this.state.inventoryNumber ? this.state.inventoryNumber.trim() : undefined;
    const description = this.state.description ? this.state.description.trim() : undefined;

    const thing = {
      serialNumber,
      inventoryNumber,
      description,
    };

    Meteor.call('things.insert', thing, (error, _id) => {
      if (error) {
        console.log(error.reason);
        this.setState({
          error: error.reason,
        });
      } else {
        this.setState({
          error: '',
          serialNumber: '',
          inventoryNumber: '',
          description: '',
        });
        console.log('Thing added!');
      }
    });
  }

  handleSerialChange (e) {
    const serialNumber = e.target.value;

    this.setState({ serialNumber });
  }

  handleInventoryChange (e) {
    const inventoryNumber = e.target.value;

    this.setState({ inventoryNumber });
  }


  handleDescriptionChange (e) {
    const description = e.target.value;

    this.setState({ description });
  }

  render () {
    return (
      <form ref={form => (this.form = form)} onSubmit={ this.handleSubmit}>
        { this.state.error ? <p>{this.state.error}</p> : undefined }
        <label>Serial Number</label>
        <input
          type="text"
          name="serialNumber"
          ref={serialNumber => (this.serialNumber = serialNumber)}
          placeholder="Serial Number"
          value={ this.state.serialNumber }
          onChange={ this.handleSerialChange }
        />
        <label>Inventory Number</label>
        <input
          type="text"
          name="inventoryNumber"
          ref={inventoryNumber => (this.inventoryNumber = inventoryNumber)}
          placeholder="Inventory Number"
          value={ this.state.inventoryNumber }
          onChange={ this.handleInventoryChange }
        />
        <label>Description</label>
        <input
          type="text"
          name="description"
          ref={description => (this.description = description)}
          placeholder="Thing Description"
          value={ this.state.description }
          onChange={ this.handleDescriptionChange }
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
};

export default ThingAdd;
