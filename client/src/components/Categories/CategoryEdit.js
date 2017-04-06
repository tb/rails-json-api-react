import React, { Component, PropTypes } from 'react';
import { requireResource } from 'redux-json-api';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { find, omit } from 'lodash';

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

        <h2>{ isNew ? 'New Category' : category.attributes.name }</h2>

        <pre>{ JSON.stringify(category, null, 2) }</pre>
      </div>
    );
  }
};

export const mapStateToProps = (state, props) => ({
  isNew: !props.params.id,
  category: (find((state.api.categories || { data: [] }).data, { id: props.params.id }) || { attributes: {} }),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchCategory: (id) => dispatch(requireResource(`categories/${id}`)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEdit);
