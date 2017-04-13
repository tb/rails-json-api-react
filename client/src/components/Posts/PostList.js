import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { get, find, keyBy } from 'lodash';

import { fetchList, getList, getMap, getMany } from '../../store/api';
import PostListFilter from './PostListFilter';

export class PostList extends Component {
  componentWillMount() {
    this.props.fetchPosts(this.props.filter);
    this.props.fetchCategories();
  }

  getCategoryForPost(post) {
    const categoryId = String(get(post, 'category.id'));
    return this.props.categoriesById[categoryId] || {};
  }

  fetchPage = (url) => (e) => {
    e.preventDefault();
    this.props.fetchPage(url);
  };

  onFilter = (filter) => {
    this.props.fetchPosts(filter);
  };

  render() {
    const { posts, categories } = this.props;
    const { prev, next } = posts.links;

    return (
      <div>
        <p>
          <Link to={'/posts/new'}>New Post</Link>
        </p>
        <PostListFilter onSubmit={this.onFilter} categories={categories}></PostListFilter>
        {posts.data.map(post =>
          <div key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
            ({this.getCategoryForPost(post).name})
          </div>
        )}
        <p>
        { next && <a href onClick={this.fetchPage(next)} style={{marginRight: '4px'}}>Next</a> }
        { prev && <a href onClick={this.fetchPage(prev)}>Prev</a> }
        </p>
      </div>
    );
  }
};

export const mapStateToProps = (state) => ({
  filter: get(state, 'form.postListFilter.values') || {},
  categoriesById: getMap(state, 'categories'),
  categories: getMany(state, 'categories'),
  posts: getList(state, 'posts'),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchPosts: (filter = {}) => dispatch(fetchList('posts', {include: 'category', filter})),
  fetchPage: (url) => dispatch(fetchList('posts', {include: 'category'}, {url})),
  fetchCategories: () => dispatch(fetchList('categories', {page: { limit: 999 }})),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
