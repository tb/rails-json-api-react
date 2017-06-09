import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { get, find, keyBy } from 'lodash';
import { Button } from 'reactstrap';

import { fetchList, getMap, getMany } from '../../store/api';
import { withResourceList } from '../../hocs';
import { ListHeader, ListTable } from '../UI';

const formatDate = date => (new Date(date)).toLocaleString();

export class OrderList extends Component {
  componentWillMount() {
    const {resourceList} = this.props;
    this.props.fetchResourceList({sort: '-orderDate', ...resourceList.params});
  }

render() {
    const { resourceList, onFilter, categories } = this.props;
    const columns = [
      {
        attribute: 'order_date',
        header: 'Order date',
        minWidth: '50px',
        rowRender: order => formatDate(order.orderDate),
      },
      {
        attribute: 'shippedDate',
        header: 'Shipped date',
        rowRender: order => formatDate(order.shippedDate),
        sortable: true,
      },
      {
        attribute: 'shipAddress',
        header: 'Ship address',
        rowRender: order => order.shipAddress,
        sortable: true,
      },
      {
        attribute: 'shipCity',
        header: 'Ship city',
        rowRender: order => order.shipCity,
        sortable: true,
      },
      {
        attribute: 'shipRegion',
        header: 'Ship region',
        rowRender: order => order.shipRegion,
        sortable: true,
      },
    ];

    return (
      <div>
        <Button tag={Link} to={'/orders/new'}>New Order</Button>
        <ListTable {...this.props} columns={columns} />
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  ordersById: getMap(state, 'orders'),
  orders: getMany(state, 'orders'),
});

export const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(fetchList('orders', { page: { size: 999 } })),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withResourceList('orders')(OrderList),
);
