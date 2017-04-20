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
    const { posts: { params }, fetchPosts } = this.props;
    fetchPosts({...params, filter});
  };

  onSort = (event) => {
    const { posts: { params }, fetchPosts } = this.props;
    const sort = event.target.value;
    fetchPosts({...params, sort});
  };

  onPageSize = (event) => {
    const { posts: { params }, fetchPosts } = this.props;
    const { page } = params;
    const size = event.target.value;
    fetchPosts({...params, page: { ...page, size }});
  };

  onPageNumber = (value) => (event) => {
    event.preventDefault();
    const { posts: { params }, fetchPosts } = this.props;
    const { page } = params;
    const number = (page.number || 1) + value;
    fetchPosts({...params, page: { ...page, number }});
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

        <p>
          <label>
            Sort&nbsp;
            <select name="sort" onChange={this.onSort}>
              <option value="title">Asc</option>
              <option value="-title">Desc</option>
            </select>
          </label>
          <label>
            &nbsp;Per Page&nbsp;
            <select name="size" onChange={this.onPageSize}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
        </p>

        {posts.data.map(post =>
          <div key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
            ({this.getCategoryForPost(post).name})
          </div>
        )}
        <p>
        { next && <a href onClick={this.onPageNumber(1)} style={{marginRight: '4px'}}>Next</a> }
        { prev && <a href onClick={this.onPageNumber(-1)}>Prev</a> }
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
  fetchPosts: (params = {}) => dispatch(fetchList('posts', {include: 'category', ...params})),
  fetchPage: (url) => dispatch(fetchList('posts', {include: 'category'}, {url})),
  fetchCategories: () => dispatch(fetchList('categories', {page: { limit: 999 }})),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
