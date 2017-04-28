import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { Button, Card, CardBlock, Form } from 'reactstrap';

import { InputField, required } from '../../forms';

class LoginForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <Card className="mx-auto" style={{maxWidth: '350px', marginTop: '50px'}}>
        <CardBlock>
          <Form onSubmit={handleSubmit}>
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
        </CardBlock>
      </Card>
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
