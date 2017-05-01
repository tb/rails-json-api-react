import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { find, keyBy } from 'lodash';
import { Table } from 'reactstrap';

import { Pagination } from '../UI';
import { withResourceList } from '../../hocs';

const formatDate = date => (new Date(date)).toLocaleString();

export class UserList extends Component {
  componentWillMount() {
    this.props.fetchResourceList();
  }

  render() {
    const { resourceList } = this.props;

    return (
      <div>
        <Table>
          <thead>
          <tr>
            <th>
              Email
            </th>
            <th>
              Confirmed at
            </th>
          </tr>
          </thead>
          <tbody>
          {resourceList.data.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.email}</Link>
              </td>
              <td>
                {formatDate(user.confirmedAt)}
              </td>
            </tr>
          )}
          </tbody>
        </Table>
        <Pagination {...this.props}></Pagination>
        {resourceList.empty && resourceList.loading && <p>Loading...</p>}
      </div>
    );
  }
}

export default withResourceList('users')(UserList);
