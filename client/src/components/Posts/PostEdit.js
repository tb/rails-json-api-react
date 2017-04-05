import React, { Component, PropTypes } from 'react';
import { requireResource, createResource, updateResource, deleteResource } from 'redux-json-api';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { find, omit } from 'lodash';
import PostForm from './PostForm';

class PostEdit extends Component {
  componentWillMount() {
    const { isNew, params } = this.props;

    this.props.fetchCategories();

    if (!isNew) {
      this.props.fetchPost(params.id);
    }
  }

  onSubmit = (values) => {
    const { params, categories, createResource, updateResource, redirectToIndex } = this.props;
    const { category_id, ...attributes } = values;
    const category = find(categories, { id: category_id }) | {};
    const relationships = {
      category: {
        data: {
          type: 'categories',
          id: category_id,
        },
        links: category.links,
      },
    };

    if (!params.id) {
      createResource({
        type: 'posts',
        attributes,
        relationships,
      }).then(redirectToIndex);
    } else {
      updateResource({
        id: params.id,
        type: 'posts',
        attributes,
      }).then(redirectToIndex);
    }
  };

  onDelete = (e) => {
    e.preventDefault();

    if (this.props.isNew) {
      this.props.redirectToIndex();
    } else {
      this.props.deleteResource(this.props.post);
      this.props.redirectToIndex();
    }
  };

  render() {
    const { isNew, post, categories } = this.props;

    return (
      <div>
        <p>
          <Link to={`/posts`}>Back to Posts</Link>
        </p>

        <h2>{ isNew ? 'New Post' : post.attributes.title }</h2>

        <p>
          <a href onClick={this.onDelete}>Delete</a>
        </p>

        <PostForm initialValues={post.attributes} categories={categories} onSubmit={this.onSubmit} />
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  isNew: !props.params.id,
  categories: (state.api.categories || { data: [] }).data,
  post: (find(
    (state.api.posts || { data: [] }).data, { id: props.params.id }
  ) || { attributes: {} }),
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchCategories: () => dispatch(requireResource('categories')),
  fetchPost: (id) => dispatch(requireResource(`posts/${id}`)),
  deleteResource: (resource) => dispatch(deleteResource(resource)),
  createResource: (resource) => dispatch(createResource(resource)),
  updateResource: (resource) => dispatch(updateResource(resource)),
  redirectToIndex: () => dispatch(push('/posts')),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit);
