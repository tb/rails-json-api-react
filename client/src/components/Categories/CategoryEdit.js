import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { find, omit } from 'lodash';

import { fetchOne, getOne } from '../../store/api';

export class CategoryEdit extends Component {
  componentWillMount() {
    const { params } = this.props;

    if (params.id) {
      this.props.fetchCategory(params.id);
    }
  }

  render() {
    const { isNew, category } = this.props;

    return (
      <div>
        <p>
          <Link to={`/categories`}>Back to Categories</Link>
        </p>

        <h2>{ isNew ? 'New Category' : category.name }</h2>

        <pre>{ JSON.stringify(category, null, 2) }</pre>
      </div>
    );
  }
};

export const mapStateToProps = (state, props) => ({
  isNew: !props.params.id,
  category: getOne(state, 'categories', props.params.id),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchCategory: (id) => dispatch(fetchOne('categories', { id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEdit);
