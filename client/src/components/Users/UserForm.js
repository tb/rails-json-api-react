import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { Button, Form } from 'reactstrap';

import { InputField, required } from '../../forms';

class UserForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <div>
          <Field
            name="email"
            label="Email"
            component={InputField}
          />
        </div>
        <div>
          <Button disabled={pristine || submitting} color="primary">Submit</Button>
          <Button disabled={pristine || submitting} onClick={reset}>Undo Changes</Button>
        </div>
      </Form>
    );
  }
}

const validate = (values) => {
  const errors = required(values, 'email');
  return errors;
};

export default reduxForm({
  enableReinitialize: true,
  form: 'user',
  validate,
})(UserForm);
