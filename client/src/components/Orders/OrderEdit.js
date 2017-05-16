import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { get, find, omit } from 'lodash';

import { ErrorAlert, Loading, EditHeader } from '../UI';
import { withResource } from '../../hocs';
import OrderForm from './OrderForm';
import {
  fetchList,
  getMany,
} from '../../store/api';

export class OrderEdit extends Component {
  componentWillMount() {
    const { params, fetchResource } = this.props;

    if (params.id) {
      fetchResource({ id: params.id });
    }
  }

  render() {
    const { isNew, error, loading, resource, onSubmit, orders } = this.props;

    if (error) {
      return (<ErrorAlert {...error} />);
    }

    if (loading) {
      return (<Loading/>);
    }

    return (
      <div>
        <EditHeader {...this.props}>{ isNew ? 'New Order' : resource.title }</EditHeader>
        <OrderForm initialValues={resource} isNew={isNew} onSubmit={onSubmit} />
      </div>
    );
  }
}

export const mapStateToProps = (state, props) => ({
  categories: getMany(state, 'orders'),
});

export const mapDispatchToProps = dispatch => ({
  redirectToIndex: () => dispatch(push('/orders')),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withResource('orders')(OrderEdit),
);
