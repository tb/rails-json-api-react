import React, { Component, PropTypes } from 'react';
import { readEndpoint } from 'redux-json-api';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { find, keyBy } from 'lodash';

export class CategoryList extends Component {
  componentWillMount() {
    this.props.fetchCategories();
  }

  render() {
    const { categories } = this.props;

    return (
      <div>
        {categories.data.map(category =>
          <div key={category.id}>
            <Link to={`/categories/${category.id}`}>{category.attributes.name}</Link>
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
  fetchCategories: () => dispatch(readEndpoint('categories')),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
