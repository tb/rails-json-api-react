import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { ErrorAlert, Loading, EditHeader } from '../UI';
import { withResource } from '../../hocs';
import CustomerForm from './CustomerForm';
import { getMany, fetchList } from '../../store/api';

export class CustomerEdit extends Component {
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
        <EditHeader {...this.props}>{ isNew ? 'New Customer' : resource.company_name }</EditHeader>
        <CustomerForm initialValues={resource} onSubmit={onSubmit}></CustomerForm>
      </div>
    );
  }
}

export const mapStateToProps = (state, props) => ({
  roles: getMany(state)
});

export const mapDispatchToProps = dispatch => ({
  redirectToIndex: () => dispatch(push('/customers'))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withResource('customers')(CustomerEdit),
);
