import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { Button, Form } from 'reactstrap';

import { InputField, SelectField, required } from '../../forms';

class UserForm extends Component {
  render() {
    const { roles, handleSubmit, pristine, reset, submitting } = this.props;

    const rolesOptions = [{
      id: '',
      name: '-- select role --',
    }].concat(roles.map(role => ({
      id: role.id,
      name: role.name,
    })));

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
          <Field
            name="role.id"
            label="Role"
            component={SelectField}
            options={rolesOptions}
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
