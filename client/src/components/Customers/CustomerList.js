import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { find, keyBy } from 'lodash';
import { Button } from 'reactstrap';

import { ListTable } from '../UI';
import { withResourceList } from '../../hocs';
import CustomerListFilter from './CustomerListFilter';

const formatDate = date => (new Date(date)).toLocaleString();

export class CustomerList extends Component {
  componentWillMount() {
    const { resourceList } = this.props;
    this.props.fetchResourceList({ sort: '-companyName', ...resourceList.params });
  }

  render() {
    const { onFilter } = this.props;
    const columns = [
      {
        attribute: 'companyName',
        header: 'Company Name',
        rowRender: customer => <Link to={`/customers/${customer.id}`}>{customer.companyName}</Link>,
        sortable: true,
      },
      {
        attribute: 'contactName',
        header: 'Contact Name',
        rowRender: customer => <Link to={`/customers/${customer.id}`}>{customer.contactName}</Link>,
        sortable: true,
      },
      {
        attribute: 'createdAt',
        header: 'Created At',
        rowRender: customer => formatDate(customer.confirmedAt),
        sortable: true,
      }
    ];

    return (
      <div>
        <Button tag={Link} to={'/customers/new'}>New Customer</Button>

        <CustomerListFilter
          onSubmit={onFilter}>
        </CustomerListFilter>

        <ListTable {...this.props} columns={columns} />
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  filter: get(state, 'form.customerListFilter.values') || {}
});

export default withResourceList('customers')(CustomerList);
