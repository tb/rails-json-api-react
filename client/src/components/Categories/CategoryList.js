import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { find, keyBy } from 'lodash';

import { fetchList, getList } from '../../store/api';

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
            <Link to={`/categories/${category.id}`}>{category.name}</Link>
          </div>
        )}
      </div>
    );
  }
};

export const mapStateToProps = (state) => ({
  categories: getList(state, 'categories'),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchList('categories')),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
