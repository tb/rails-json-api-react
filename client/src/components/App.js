import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { getUser, logout } from '../store/api';

export class App extends Component {
  logout = (e) => {
    e.preventDefault();
    this.props.logout(this.props.user);
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <p>
          <Link to={'/posts'}>Posts</Link> |&nbsp;
          <Link to={'/categories'}>Categories</Link> |&nbsp;
          <Link to={'/users'}>Users</Link> |&nbsp;
          {
            isEmpty(user)
              ? <Link to={'/login'}>Log in</Link>
              : <a href="/" onClick={this.logout}>Logout</a>
          }
        </p>
        <hr />
        {this.props.children}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  user: getUser(state),
});

export const mapDispatchToProps = (dispatch) => ({
  logout: (payload) => dispatch(logout('auth', payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
