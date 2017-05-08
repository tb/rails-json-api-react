import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { get, find, omit } from 'lodash';

import { ErrorAlert, Loading, EditHeader } from '../UI';
import { withResource } from '../../hocs';
import UserForm from './UserForm';

export class UserEdit extends Component {
  componentWillMount() {
    const { params, fetchResource } = this.props;

    if (params.id) {
      fetchResource({ id: params.id });
    }
  }

  render() {
    const { isNew, error, loading, resource, onSubmit } = this.props;

    if (error) {
      return (<ErrorAlert {...error} />);
    }

    if (loading) {
      return (<Loading />);
    }

    return (
      <div>
        <EditHeader {...this.props}>{ isNew ? 'New User' : resource.email }</EditHeader>
        <UserForm initialValues={resource} onSubmit={onSubmit}></UserForm>
      </div>
    );
  }
}

export const mapStateToProps = (state, props) => ({});

export const mapDispatchToProps = dispatch => ({
  redirectToIndex: () => dispatch(push('/users')),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withResource('users')(UserEdit),
);
