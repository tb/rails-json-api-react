import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import { login } from '../../store/api';

export class Login extends Component {
  onSubmit = (values) => this.props.login(values);

  render() {
    return (
      <div>
        <LoginForm onSubmit={this.onSubmit}/>
      </div>
    )
  }
};

export const mapStateToProps = (state) => ({
});

export const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(login('auth', payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
