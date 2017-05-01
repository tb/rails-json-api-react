import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { get, find, keyBy } from 'lodash';
import { Button, Table } from 'reactstrap';

import { fetchList, getMap, getMany } from '../../store/api';
import { withResourceList } from '../../hocs';
import { ListHeader, Pagination } from '../UI';
import PostListFilter from './PostListFilter';

const formatDate = date => (new Date(date)).toLocaleString();

export class PostList extends Component {
  componentWillMount() {
    const { resourceList } = this.props;
    this.props.fetchResourceList({ sort: '-createdAt', ...resourceList.params, include: 'category' });
    this.props.fetchCategories();
  }

  getCategoryForPost(post) {
    const categoryId = String(get(post, 'category.id'));
    return this.props.categoriesById[categoryId] || {};
  }

  render() {
    const { resourceList, onFilter, onSort, categories } = this.props;

    return (
      <div>
        <Button tag={Link} to={'/posts/new'}>New Post</Button>

        <PostListFilter
          initialValues={{category: '', ...resourceList.params.filter}}
          onSubmit={onFilter}
          categories={categories}>
        </PostListFilter>

        <Table>
          <thead>
          <tr>
            <th>
              Category
            </th>
            <th>
              Title&nbsp;
              <select name="sort" value={resourceList.params.sort} onChange={onSort}>
                <option value="title">Asc</option>
                <option value="-title">Desc</option>
              </select>
            </th>
            <th>
              Created at&nbsp;
              <select name="sort" value={resourceList.params.sort} onChange={onSort}>
                <option value="createdAt">Asc</option>
                <option value="-createdAt">Desc</option>
              </select>
            </th>
          </tr>
          </thead>
          <tbody>
          {resourceList.data.map(post =>
            <tr key={post.id}>
              <td>
                {this.getCategoryForPost(post).name}
              </td>
              <td>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </td>
              <td>
                {formatDate(post.createdAt)}
              </td>
            </tr>
          )}
          </tbody>
        </Table>
        <Pagination {...this.props}></Pagination>
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
  fetchCategories: () => dispatch(fetchList('categories', { page: { size: 999 } })),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withResourceList('posts')(PostList),
);
