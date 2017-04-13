import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
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
    const { params } = this.props;

    this.props.fetchCategories();

    if (params.id) {
      this.props.fetchPost(params.id);
    }
  }

  onSubmit = (values) => {
    const { params, post, categories, createResource, updateResource, redirectToIndex } = this.props;

    const payload = {
      id: post.id,
      ...values,
    };

    if (!params.id) {
      createResource(payload).then(redirectToIndex);
    } else {
      updateResource(payload).then(redirectToIndex);
    }
  };

  onDelete = (e) => {
    e.preventDefault();
    this.props.deleteResource(this.props.post)
      .then(this.props.redirectToIndex);
  };

  render() {
    const { isNew, post, categories } = this.props;

    return (
      <div>
        <p>
          <Link to={`/posts`}>Back to Posts</Link>
        </p>

        <h2>{ isNew ? 'New Post' : post.title }</h2>

        { !isNew &&
          <p>
            <a href onClick={this.onDelete}>Delete</a>
          </p>
        }

        <PostForm initialValues={post} categories={categories} onSubmit={this.onSubmit} />
      </div>
    );
  }
};

export const mapStateToProps = (state, props) => ({
  isNew: !props.params.id,
  categories: getMany(state, 'categories'),
  post: getOne(state, 'posts', props.params.id),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchList('categories', {page: { limit: 999 }})),
  fetchPost: (id) => dispatch(fetchOne('posts', { id, include: 'category' })),
  deleteResource: (resource) => dispatch(deleteResource('posts', resource)),
  createResource: (resource) => dispatch(createResource('posts', resource)),
  updateResource: (resource) => dispatch(updateResource('posts', resource)),
  redirectToIndex: () => dispatch(push('/posts')),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit);
