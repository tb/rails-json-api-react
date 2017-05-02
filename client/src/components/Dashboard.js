import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { get, find, keyBy } from 'lodash';

import { fetchList, getList, getMap } from '../store/api';

const formatDate = date => (new Date(date)).toLocaleString();

export class Dashobard extends Component {
  componentWillMount() {
    this.props.fetchPostsList();
  }

  getCategoryForPost(post) {
    const categoryId = String(get(post, 'category.id'));
    return this.props.categoriesById[categoryId] || {};
  }

  render() {
    const { postsList } = this.props;

    return (
      <div>
        <h4>Latest posts</h4>
        {postsList.empty && postsList.loading && <p>Loading...</p>}
        {postsList.data.map(post =>
          <div key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
            ({this.getCategoryForPost(post).name})
            {formatDate(post.createdAt)}
          </div>,
        )}
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  postsList: getList(state, 'posts', 'latestPosts'),
  categoriesById: getMap(state, 'categories'),
});

export const mapDispatchToProps = dispatch => ({
  fetchPostsList: () => dispatch(fetchList(
    'posts',
    { include: 'category', page: { size: 5 }, sort: '-createdAt' },
    { list: 'latestPosts' },
  )),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashobard);
