import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { find, keyBy } from 'lodash';

import { ListTable } from '../UI';
import { withResourceList } from '../../hocs';

const formatDate = date => (new Date(date)).toLocaleString();

export class UserList extends Component {
  componentWillMount() {
    const { resourceList } = this.props;
    this.props.fetchResourceList({ sort: '-createdAt', ...resourceList.params });
  }

  render() {
    const columns = [
      {
        attribute: 'email',
        header: 'Email',
        rowRender: user => <Link to={`/users/${user.id}`}>{user.email}</Link>,
        sortable: true,
      },
      {
        attribute: 'createdAt',
        header: 'Created At',
        rowRender: user => formatDate(user.confirmedAt),
        sortable: true,
      },
      {
        attribute: 'role',
        header: 'Role',
        rowRender: user => user.role,
      }
    ];

    return (
      <ListTable {...this.props} columns={columns} />
    );
  }
}

export default withResourceList('users')(UserList);
