import React, { Component, PropTypes } from 'react';
import { readEndpoint } from 'redux-json-api';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class PostList extends React.Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div>
        <p>
          <Link to={'/posts/new'}>New Post</Link>
        </p>
        {this.props.posts.data.map(post =>
          <div key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.attributes.title}</Link>
          </div>
        )}
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  posts: state.api.posts || {data: []},
});

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(readEndpoint('posts?include=category')),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
