import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { find, keyBy } from 'lodash';
import { Button, Table } from 'reactstrap';

import { withResourceList } from '../../hocs';

const formatDate = date => (new Date(date)).toLocaleString();

export class UserList extends Component {
  componentWillMount() {
    this.props.fetchResourceList();
  }

  render() {
    const { resourceList, onPageNumber } = this.props;
    const { prev, next } = resourceList.links;

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
        <div>
          { prev && <Button onClick={onPageNumber(-1)}>Prev</Button> }
          { next && <Button onClick={onPageNumber(1)} style={{ marginRight: '4px' }}>Next</Button> }
        </div>
      </div>
    );
  }
}

export default withResourceList('users')(UserList);
