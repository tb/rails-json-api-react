import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { get, find, omit } from 'lodash';

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
    const { isNew, resource, onDelete, onSubmit } = this.props;

    return (
      <div>
        <p>
          <Link to={'/users'}>Back to Users</Link>
        </p>

        <h2>{ isNew ? 'New User' : resource.email }</h2>

        { !isNew &&
        <p>
          <a href onClick={onDelete}>Delete</a>
        </p>
        }

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
