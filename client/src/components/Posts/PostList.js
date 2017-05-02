import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { get, find, keyBy } from 'lodash';
import { Button } from 'reactstrap';

import { fetchList, getMap, getMany } from '../../store/api';
import { withResourceList } from '../../hocs';
import { ListHeader, ListTable } from '../UI';
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
    const { resourceList, onFilter, categories } = this.props;

    const columns = [
      {
        header: 'Category',
        minWidth: '50px',
        rowRender: post => this.getCategoryForPost(post).name,
      },
      {
        attribute: 'title',
        header: 'Title',
        rowRender: post => <Link to={`/posts/${post.id}`}>{post.title}</Link>,
        sortable: true,
      },
      {
        attribute: 'createdAt',
        header: 'Created At',
        rowRender: post => formatDate(post.createdAt),
        sortable: true,
      },
    ];

    return (
      <div>
        <Button tag={Link} to={'/posts/new'}>New Post</Button>

        <PostListFilter
          initialValues={{ category: '', ...resourceList.params.filter }}
          onSubmit={onFilter}
          categories={categories}>
        </PostListFilter>

        <ListTable {...this.props} columns={columns} />
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
