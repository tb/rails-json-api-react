import React, { Component, PropTypes } from 'react';
import { readEndpoint } from 'redux-json-api';
import { connect } from 'react-redux';

class PostList extends React.Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div>
        {this.props.posts.data.map(post =>
          <div key={post.id}>
            {post.attributes.title}
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

// https://github.com/dixieio/redux-json-api/issues/47
// https://github.com/dixieio/redux-json-api/issues/83

