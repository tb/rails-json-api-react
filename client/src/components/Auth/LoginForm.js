import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { Alert, Button, Form } from 'reactstrap';

import { SingleCard } from '../UI';
import { InputField, required } from '../../forms';

class LoginForm extends Component {
  render() {
    const { handleSubmit, submitting, error } = this.props;

    return (
      <SingleCard>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
          {error && <Alert color="danger">{error}</Alert>}
          <Field
            name="email"
            label="Email"
            component={InputField}
          />
          <Field
            name="password"
            label="Password"
            component={InputField}
            type='password'
          />
          <Button disabled={submitting}>Login</Button>
        </Form>
      </SingleCard>
    );
  }
}

const validate = (values) => {
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
