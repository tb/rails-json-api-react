import React, { Component, PropTypes } from 'react';
import { readEndpoint } from 'redux-json-api';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { get, keyBy } from 'lodash';

export class PostList extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  getCategoryForPost(post) {
    const categoryId = get(post, 'relationships.category.data.id');
    return this.props.categoriesById[categoryId] || { attributes: {} };
  }

  fetchPage = (url) => (e) => {
    e.preventDefault();
    this.props.fetchPage(url);
  };

  render() {
    const { posts, prev, next } = this.props;

    return (
      <div>
        <p>
          <Link to={'/posts/new'}>New Post</Link>
        </p>
        {posts.data.map(post =>
          <div key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.attributes.title}</Link>
            ({this.getCategoryForPost(post).attributes.name})
          </div>
        )}
        {/*{ prev && <a href onClick={this.fetchPage(prev)}>Prev</a> }*/}
        {/*{ next && <a href onClick={this.fetchPage(next)}>Next</a> }*/}
        { next && <a href onClick={this.fetchPage(next)}>More</a> }
      </div>
    );
  }
};

export const mapStateToProps = (state) => ({
  categoriesById: keyBy((state.api.categories || {data: []}).data, 'id'),
  posts: state.api.posts || {data: []},
  next: get(state, 'api.links.posts.next'),
  prev: get(state, 'api.links.posts.prev'),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(readEndpoint('posts?include=category', { options: { indexLinks: 'posts' } })),
  fetchPage: (url) => dispatch(readEndpoint(url, { options: { indexLinks: 'posts' } })),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
