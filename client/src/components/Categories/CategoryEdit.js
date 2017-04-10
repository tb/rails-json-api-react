import React, { Component, PropTypes } from 'react';
import { requireResource, createResource, updateResource, deleteResource } from 'redux-json-api';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { find, omit } from 'lodash';
import CategoryForm from './CategoryForm';

export class CategoryEdit extends Component {
  componentWillMount() {
    const { params } = this.props;

    if (params.id) {
      this.props.fetchCategory(params.id);
    }
  }

  onSubmit = (values) => {
    const { params, createResource, updateResource, redirectToIndex } = this.props;
    const { ...attributes } = values;

    if (!params.id) {
      createResource({
        type: 'categories',
        attributes,
      }).then(redirectToIndex);
    } else {
      updateResource({
        id: params.id,
        type: 'categories',
        attributes,
      }).then(redirectToIndex);
    }
  };

  render() {
    const { isNew, category } = this.props;

    return (
      <div>
        <p>
          <Link to={`/categories`}>Back to Categories</Link>
        </p>

        <h2>{ isNew ? 'New Category' : category.attributes.name }</h2>

        { !isNew &&
          <p>
            <a href onClick={this.onDelete}>Delete</a>
          </p>
        }

        <CategoryForm initialValues={category.attributes} onSubmit={this.onSubmit} />
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
  deleteResource: (resource) => dispatch(deleteResource(resource)),
  createResource: (resource) => dispatch(createResource(resource)),
  updateResource: (resource) => dispatch(updateResource(resource)),
  redirectToIndex: () => dispatch(push('/categories')),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEdit);
