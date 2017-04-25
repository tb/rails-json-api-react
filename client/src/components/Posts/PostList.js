import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { get, find, keyBy } from 'lodash';

import { fetchList, getMap, getMany } from '../../store/api';
import { withResourceList } from '../../hocs';
import PostListFilter from './PostListFilter';

export class PostList extends Component {
  componentWillMount() {
    const { resourceList } = this.props;
    this.props.fetchResourceList({ ...resourceList.params, include: 'category' });
    this.props.fetchCategories();
  }

  getCategoryForPost(post) {
    const categoryId = String(get(post, 'category.id'));
    return this.props.categoriesById[categoryId] || {};
  }

  render() {
    const { resourceList, onFilter, onSort, onPageSize, onPageNumber, categories } = this.props;
    const { prev, next } = resourceList.links;

    return (
      <div>
        <p>
          <Link to={'/posts/new'}>New Post</Link>
        </p>

        <PostListFilter
          initialValues={resourceList.params.filter}
          onSubmit={onFilter}
          categories={categories}>
        </PostListFilter>

        <p>
          <label>
            Sort&nbsp;
            <select name="sort" onChange={onSort}>
              <option value="title">Asc</option>
              <option value="-title">Desc</option>
            </select>
          </label>
          <label>
            &nbsp;Per Page&nbsp;
            <select name="size" onChange={onPageSize}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
        </p>

        {resourceList.data.map(post =>
          <div key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
            ({this.getCategoryForPost(post).name})
          </div>,
        )}
        <p>
          { next && <a href onClick={onPageNumber(1)} style={{ marginRight: '4px' }}>Next</a> }
          { prev && <a href onClick={onPageNumber(-1)}>Prev</a> }
        </p>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  filter: get(state, 'form.postListFilter.values') || {},
  categoriesById: getMap(state, 'categories'),
  categories: getMany(state, 'categories'),
});

export const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchList('categories', { page: { limit: 999 } })),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withResourceList('posts')(PostList),
);
