import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { find, omit } from 'lodash';

import { withResource } from '../../hocs';
import CategoryForm from './CategoryForm';

export class CategoryEdit extends Component {
  componentWillMount() {
    const { params, fetchResource } = this.props;

    if (params.id) {
      fetchResource({ id: params.id });
    }
  }

  render() {
    const { isNew, resource, onDelete, onSubmit } = this.props;

    return (
      <div>
        <p>
          <Link to={'/categories'}>Back to Categories</Link>
        </p>

        <h2>{ isNew ? 'New Category' : resource.name }</h2>

        { !isNew &&
        <p>
          <a href onClick={onDelete}>Delete</a>
        </p>
        }

        <CategoryForm initialValues={resource} onSubmit={onSubmit} />
      </div>
    );
  }
}

export const mapStateToProps = (state, props) => ({});

export const mapDispatchToProps = dispatch => ({
  redirectToIndex: () => dispatch(push('/categories')),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withResource('categories')(CategoryEdit),
);
