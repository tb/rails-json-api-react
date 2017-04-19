import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { getUser, logout } from '../store/api';

export class App extends Component {
  logout = () => this.props.logout(this.props.user);

  render() {
    return (
      <div>
        <p>
          <Link to={'/posts'}>Posts</Link> |&nbsp;
          <Link to={'/categories'}>Categories</Link> |&nbsp;
          <Link to={'/users'}>Users</Link> |&nbsp;
          <Link to={'/login'}>Log in </Link> |&nbsp;
          <Link onClick={this.logout}>Logout </Link>
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
