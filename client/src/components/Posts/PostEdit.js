import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { get, find, omit } from 'lodash';

import { withResource } from '../../hocs';
import PostForm from './PostForm';
import {
  fetchList,
  getMany,
} from '../../store/api';

export class PostEdit extends Component {
  componentWillMount() {
    const { params, fetchResource, fetchCategories } = this.props;

    fetchCategories();

    if (params.id) {
      fetchResource({ id: params.id, include: 'category' });
    }
  }

  render() {
    const { isNew, resource, onDelete, onSubmit, categories } = this.props;

    return (
      <div>
        <p>
          <Link to={'/posts'}>Back to Posts</Link>
        </p>

        <h2>{ isNew ? 'New Post' : resource.title }</h2>

        { !isNew &&
        <p>
          <a href onClick={onDelete}>Delete</a>
        </p>
        }

        <PostForm initialValues={resource} categories={categories} onSubmit={onSubmit} />
      </div>
    );
  }
}

export const mapStateToProps = (state, props) => ({
  categories: getMany(state, 'categories'),
});

export const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchList('categories', { page: { limit: 999 } })),
  redirectToIndex: () => dispatch(push('/posts')),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withResource('posts')(PostEdit),
);
