import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker} from 'meteor/react-meteor-data';
import moment from 'moment';
import PropTypes from 'prop-types';

import { Pages } from '../../../api/Pages/pages';

import Loading from '../../components/Loading/Loading';

class EditPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      title: '',
      body: '',
    }
  }

  componentDidMount() {
    Meteor.subscribe('pages', () => {
      const willMountPage = Pages.findOne(this.props.pageId);
      this.setState({
        title: willMountPage.title,
        body: willMountPage.body,
      });
    });
  }

  componentDidUpdate (prevProps, prevState) {
    const currentPageId = this.props.page ? this.props.page._id : undefined;
    const prevPageId = prevProps.page ? prevProps.page._id : undefined;

    if (currentPageId && currentPageId !== prevPageId) {
      this.setState({
        body: this.props.page.body
      });
    }
  }

  handleBodyChange (e) {
    const body = e.target.value;
    this.setState({ body })
    Meteor.call('pages.update', this.props.page._id, { body } );
  }

  render () {
    if (!this.props.loading) {
      return (this.props.page ?
      (
        <div>
          <h2>{ this.state.title || 'Untitled page' }</h2>
          <p>Last edited: { moment(this.props.page.updatedAt).format('D.M.YYYY H:mm')}</p>
          <div>
            <textarea
              value={ this.state.body }
              placeholder="Your note here."
              onChange={ this.handleBodyChange.bind(this)}>
            </textarea>
          </div>
        </div>
      ) : <Loading />);
    } else {
      return (
        <div>
          Page not found
        </div>
      )
    }
  }
}

EditPage.propTypes = {
  page: PropTypes.object,
};

export default withTracker(({ match }) => {
  const pageId = match.params.id;
  const subscription = Meteor.subscribe('pages');
  return {
    pageId,
    loading: !subscription.ready(),
    page: Pages.findOne(pageId),
  }
})(EditPage);
