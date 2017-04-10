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
    return category.relationships.posts.data.length
  }

  render() {
    const { categories } = this.props;

    return (
      <div>
        <p>
          <Link to={'/categories/new'}>New Category</Link>
        </p>
        {categories.data.map(category =>
          <div key={category.id}>
            <Link to={`/categories/${category.id}`}>{category.attributes.name}</Link>
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
