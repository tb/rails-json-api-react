import React, { Component, PropTypes } from 'react';
import { readEndpoint } from 'redux-json-api';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { get } from 'lodash';

export class CategoryList extends Component {
  componentWillMount() {
    this.props.fetchCategories();
  }

  getPostsCountForCategory(category) {
    return get(category, 'relationships.posts.data.length') || 0
  }

  render() {
    const { categories } = this.props;

    return (
      <div>
        <p>
          <Link to={'admin/categories/new'}>New Category</Link>
        </p>
        {categories.data.map(category =>
          <div key={category.id}>
            <Link to={`admin/categories/${category.id}`}>{category.attributes.name}</Link>
            ({this.getPostsCountForCategory(category)})
          </div>
        )}
      </div>
    );
  }
};

export const mapStateToProps = (state) => ({
  categories: state.api.categories || {data: []},
});

export const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(readEndpoint('categories?include=posts')),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
