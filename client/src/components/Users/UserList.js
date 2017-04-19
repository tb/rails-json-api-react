import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { find, keyBy } from 'lodash';

import { fetchList, getList } from '../../store/api';

const formatDate = (date) => (new Date(date)).toLocaleString();

export class UserList extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  fetchPage = (url) => (e) => {
    e.preventDefault();
    this.props.fetchPage(url);
  };

  render() {
    const { users } = this.props;
    const { prev, next } = users.links;

    return (
      <div>
        {users.data.map(user =>
          <div key={user.id}>
            <Link to={`/users/${user.id}`}>{user.email}</Link>
            &nbsp;(confirmed at: {formatDate(user['confirmed-at'])})
          </div>
        )}
        <p>
          { next && <a href onClick={this.fetchPage(next)} style={{marginRight: '4px'}}>Next</a> }
          { prev && <a href onClick={this.fetchPage(prev)}>Prev</a> }
        </p>
      </div>
    );
  }
};

export const mapStateToProps = (state) => ({
  users: getList(state, 'users'),
});

export const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchList('users')),
  fetchPage: (url) => dispatch(fetchList('users', {}, {url})),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
