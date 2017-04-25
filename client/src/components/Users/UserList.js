import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { find, keyBy } from 'lodash';

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
        {resourceList.data.map(user =>
          <div key={user.id}>
            <Link to={`/users/${user.id}`}>{user.email}</Link>
            &nbsp;(confirmed at: {formatDate(user.confirmedAt)})
          </div>,
        )}
        <p>
          { next && <a href onClick={onPageNumber(1)} style={{ marginRight: '4px' }}>Next</a> }
          { prev && <a href onClick={onPageNumber(-1)}>Prev</a> }
        </p>
      </div>
    );
  }
}

export default withResourceList('users')(UserList);
