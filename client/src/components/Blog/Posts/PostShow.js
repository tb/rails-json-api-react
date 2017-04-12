import React, { Component, PropTypes } from 'react';
import { requireResource } from 'redux-json-api';
import { CommentList } from './Comments/CommentList'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { get, find } from 'lodash';

export class BlogPostShow extends Component {
  componentWillMount() {
    const { params } = this.props;

    if (params.id) {
      this.props.fetchPost(params.id);
    }
  }

  render() {
    const { post, comments } = this.props;

    return(
      <div>
        <div>
          <Link to={`/`}>Back to Posts</Link>
        </div>

        <h2> { post.attributes.title } </h2>

        <h3> { post.attributes.body } </h3>
        <CommentList comments={ comments } />
      </div>
    );
  }
};

export const mapStateToProps = (state, props) => ({
  post: (find((state.api.posts || { data: [] }).data, { id: props.params.id }) || { attributes: {} }),
  comments: (state.api.comments || { data: [] }),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchPost: (id) => dispatch(requireResource(`posts/${id}?include=comments`)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostShow);
