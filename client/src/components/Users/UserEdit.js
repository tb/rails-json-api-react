import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { ErrorAlert, Loading, EditHeader } from '../UI';
import { withResource } from '../../hocs';
import UserForm from './UserForm';
import { getMany, fetchList } from '../../store/api';

export class UserEdit extends Component {
  componentWillMount() {
    const { params, fetchResource, fetchRoles } = this.props;

    fetchRoles();

    if (params.id) {
      fetchResource({ id: params.id });
    }
  }

  render() {
    const { isNew, error, loading, resource, onSubmit, roles } = this.props;

    if (error) {
      return (<ErrorAlert {...error} />);
    }

    if (loading) {
      return (<Loading />);
    }

    return (
      <div>
        <EditHeader {...this.props}>{ isNew ? 'New User' : resource.email }</EditHeader>
        <UserForm initialValues={resource} roles={roles} onSubmit={onSubmit}/>
      </div>
    );
  }
}

export const mapStateToProps = (state, props) => ({
  roles: getMany(state, 'roles'),
});

export const mapDispatchToProps = dispatch => ({
  fetchRoles: () => dispatch(fetchList('roles', { page: { limit: 999 } })),
  redirectToIndex: () => dispatch(push('/users')),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withResource('users')(UserEdit),
);
