import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { SubmissionError } from 'redux-form';

import LoginForm from './LoginForm';
import { login } from '../../store/api';

export class Login extends Component {
  onSubmit = values => this.props.login(values)
    .then(this.props.redirect)
    .catch(({response}) => {
      throw new SubmissionError({_error: response.data.errors.join()});
    });

  render() {
    return (
      <LoginForm onSubmit={this.onSubmit}/>
    );
  }
}

export const mapStateToProps = state => ({});

export const mapDispatchToProps = (dispatch, props) => ({
  login: payload => dispatch(login('auth', payload)),
  redirect: () => dispatch(replace(props.location.query.redirect || '/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
