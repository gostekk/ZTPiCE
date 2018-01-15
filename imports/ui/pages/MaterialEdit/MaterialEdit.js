import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker} from 'meteor/react-meteor-data';
import moment from 'moment';
import PropTypes from 'prop-types';

import { Materials } from '../../../api/Materials/materials';

import Loading from '../../components/Loading/Loading';

class MaterialEdit extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      description: '',
    }
  }

  componentDidMount() {
    Meteor.subscribe('material.edit', this.props.match.params.id, () => {
      const willMountMaterial = Materials.findOne(this.props.match.params.id);
      if (willMountMaterial) {
        this.setState({
          description: willMountMaterial.description,
        });
      }
    });
  }

  componentDidUpdate (prevProps, prevState) {
    const currentMaterialId = this.props.material ? this.props.material._id : undefined;
    const prevMaterialId = prevProps.material ? prevProps.material._id : undefined;

    if (currentMaterialId && currentMaterialId !== prevMaterialId) {
      this.setState({
        description: this.props.material.body
      });
    }
  }

  handleDescriptionChange (e) {
    const description = e.target.value;

    this.setState({ description })
    Meteor.call('materials.update', this.props.material._id, description );
  }

  render () {
    if (!this.props.loading) {
      return (this.props.material ?
      (
        <div>
          <button onClick={() => this.props.history.push('/didactics')}>Back</button>
          <p>Last edited: { moment(this.props.material.updatedAt).format('D.M.YYYY H:mm')}</p>
          <div>
            <textarea
              value={ this.state.description }
              placeholder="Your material content here."
              onChange={ this.handleDescriptionChange.bind(this) }>
            </textarea>
          </div>
        </div>
      ) : <Loading />);
    } else {
      return (
        <div>
          Material not found
        </div>
      )
    }
  }
}

MaterialEdit.propTypes = {
  material: PropTypes.object,
};

export default withTracker(({ match }) => {
  const subscription = Meteor.subscribe('material.edit', match.params.id);
  return {
    loading: !subscription.ready(),
    material: Materials.findOne(match.params.id),
  }
})(MaterialEdit);
