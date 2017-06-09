import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { ErrorAlert, Loading, EditHeader } from '../UI';
import { withResource } from '../../hocs';
import ProductForm from './ProductForm';
import { getMany, fetchList } from '../../store/api';

export class ProductEdit extends Component {
  componentWillMount() {
    const { params, fetchResource } = this.props;

    if (params.id) {
      fetchResource({ id: params.id });
    }
  }

  render() {
    const { isNew, error, loading, resource, onSubmit } = this.props;

    if (error) {
      return (<ErrorAlert {...error} />);
    }

    if (loading) {
      return (<Loading />);
    }

    return (
      <div>
        <EditHeader {...this.props}>{ isNew ? 'New Product' : resource.productName }</EditHeader>
        <ProductForm initialValues={resource} onSubmit={onSubmit}></ProductForm>
      </div>
    );
  }
}


export const mapDispatchToProps = dispatch => ({
  redirectToIndex: () => dispatch(push('/products')),
});

export default connect(null, mapDispatchToProps)(
  withResource('products')(ProductEdit),
);
