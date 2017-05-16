import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { find, keyBy } from 'lodash';

import { ListTable } from '../UI';
import { withResourceList } from '../../hocs';
import { Button } from 'reactstrap';

const formatDate = date => (new Date(date)).toLocaleString();

export class ProductList extends Component {
  componentWillMount() {
    const { resourceList } = this.props;
    this.props.fetchResourceList({ sort: '-createdAt', ...resourceList.params });
  }

  render() {
    const columns = [
      {
        attribute: 'productName',
        header: 'Name',
        rowRender: product => <Link to={`/products/${product.id}`}>{product.productName}</Link>,
        sortable: true,
      },
      {
        attribute: 'createdAt',
        header: 'Created At',
        rowRender: product => formatDate(product.createdAt),
        sortable: true,
      }
    ];

    return (
      <div>
        <Button tag={Link} to={'/products/new'}>New Product</Button>
        <ListTable {...this.props} columns={columns} />
      </div>
    );
  }
}

export default withResourceList('products')(ProductList);
