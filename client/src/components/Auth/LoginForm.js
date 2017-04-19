import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { Field, reduxForm } from 'redux-form';

import { InputField, required } from '../Forms';

class LoginForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="email" component={InputField} />
          <Field name="password" component={InputField} type='password' />
        </div>
        <div>
          <button type="submit" disabled={submitting}>Submit</button>
        </div>
      </form>
    );
  }
}

const validate = values => {
  const errors = required(values,
    'email',
    'password',
  );
  return errors;
};

export default reduxForm({
  enableReinitialize: true,
  form: 'login',
  validate,
})(LoginForm);
