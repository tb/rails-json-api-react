import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { find, omit } from 'lodash';

import CategoryForm from './CategoryForm';
import {
  fetchOne,
  createResource,
  updateResource,
  deleteResource,
  getOne,
} from '../../store/api';

export class CategoryEdit extends Component {
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

    if (!params.id) {
      createResource(payload).then(redirectToIndex);
    } else {
      updateResource(payload).then(redirectToIndex);
    }
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
          <Link to={`/categories`}>Back to Categories</Link>
        </p>

        <h2>{ isNew ? 'New Category' : resource.name }</h2>

        { !isNew &&
        <p>
          <a href onClick={this.onDelete}>Delete</a>
        </p>
        }

        <CategoryForm initialValues={resource} onSubmit={this.onSubmit} />
      </div>
    );
  }
};

export const mapStateToProps = (state, props) => ({
  isNew: !props.params.id,
  resource: getOne(state, 'categories', props.params.id),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchResource: (id) => dispatch(fetchOne('categories', { id })),
  createResource: (resource) => dispatch(createResource('categories', resource)),
  updateResource: (resource) => dispatch(updateResource('categories', resource)),
  deleteResource: (resource) => dispatch(deleteResource('categories', resource)),
  redirectToIndex: () => dispatch(push('/categories')),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEdit);
