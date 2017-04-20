import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { get, find, omit } from 'lodash';

import UserForm from './UserForm';

import {
  fetchOne,
  createResource,
  updateResource,
  deleteResource,
  getOne,
} from '../../store/api';

export class UserEdit extends Component {
  componentWillMount() {
    const { params, fetchResource } = this.props;

    if (params.id) {
      fetchResource(params.id);
    }
  }

  onSubmit = (values) => {
    const { params, resource, createResource, updateResource, redirectToIndex } = this.props;

    const payload = {
      id: resource.id,
      ...values,
    };

    return (params.id ? updateResource : createResource)(payload)
      .then(redirectToIndex)
      .catch((errors) => { throw new SubmissionError(errors) });
  };

  onDelete = (e) => {
    const { deleteResource, resource, redirectToIndex } = this.props;
    e.preventDefault();
    deleteResource(resource).then(redirectToIndex);
  };

  render() {
    const { isNew, resource } = this.props;

    return (
      <div>
        <p>
          <Link to={`/users`}>Back to Users</Link>
        </p>

        <h2>{ isNew ? 'New User' : resource.email }</h2>

        { !isNew &&
        <p>
          <a href onClick={this.onDelete}>Delete</a>
        </p>
        }

        <UserForm initialValues={resource} onSubmit={this.onSubmit}></UserForm>
      </div>
    );
  }
};

export const mapStateToProps = (state, props) => ({
  isNew: !props.params.id,
  resource: getOne(state, 'users', props.params.id),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchResource: (id) => dispatch(fetchOne('users', { id })),
  createResource: (resource) => dispatch(createResource('users', resource)),
  updateResource: (resource) => dispatch(updateResource('users', resource)),
  deleteResource: (resource) => dispatch(deleteResource('users', resource)),
  redirectToIndex: () => dispatch(push('/users')),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
