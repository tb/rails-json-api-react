import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import LoginForm from './LoginForm';
import { login } from '../../store/api';

export class Login extends Component {
  onSubmit = (values) => this.props.login(values).then(this.props.redirect);

  render() {
    return (
      <div>
        <LoginForm onSubmit={this.onSubmit}/>
      </div>
    )
  }
};

export const mapStateToProps = (state) => ({});

export const mapDispatchToProps = (dispatch, props) => ({
  login: (payload) => dispatch(login('auth', payload)),
  redirect: () => dispatch(replace(props.location.query.redirect || '/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
