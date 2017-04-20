import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { get, find, omit } from 'lodash';

import PostForm from './PostForm';
import {
  fetchOne,
  fetchList,
  createResource,
  updateResource,
  deleteResource,
  getOne,
  getMany,
} from '../../store/api';

export class PostEdit extends Component {
  componentWillMount() {
    const { params, fetchResource, fetchCategories } = this.props;

    fetchCategories();

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
    const { isNew, resource, categories } = this.props;

    return (
      <div>
        <p>
          <Link to={`/posts`}>Back to Posts</Link>
        </p>

        <h2>{ isNew ? 'New Post' : resource.title }</h2>

        { !isNew &&
          <p>
            <a href onClick={this.onDelete}>Delete</a>
          </p>
        }

        <PostForm initialValues={resource} categories={categories} onSubmit={this.onSubmit} />
      </div>
    );
  }
};

export const mapStateToProps = (state, props) => ({
  isNew: !props.params.id,
  categories: getMany(state, 'categories'),
  resource: getOne(state, 'posts', props.params.id),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchList('categories', {page: { limit: 999 }})),
  fetchResource: (id) => dispatch(fetchOne('posts', { id, include: 'category' })),
  createResource: (resource) => dispatch(createResource('posts', resource)),
  updateResource: (resource) => dispatch(updateResource('posts', resource)),
  deleteResource: (resource) => dispatch(deleteResource('posts', resource)),
  redirectToIndex: () => dispatch(push('/posts')),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit);
