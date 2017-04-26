import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { Button, Col, Form, Row } from 'reactstrap';

import { InputField, required } from '../../forms';

class LoginForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <Row style={{marginTop: '50px'}}>
        <Col md={{ size: 4, offset: 4 }}>
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
        </Col>
      </Row>
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
