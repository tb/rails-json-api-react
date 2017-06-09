import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { Button, Form } from 'reactstrap';

import { InputField, MultiselectField, required } from '../../forms';

class CustomerForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <div>
          <Field
            name="companyName"
            label="Company name"
            component={InputField}
          />
          <Field
            name="contactName"
            label="Contact name"
            component={InputField}
          />
          <Field
            name="contactTitle"
            label="Contact title"
            component={InputField}
          />
          <Field
            name="address"
            label="Address"
            component={InputField}
          />
          <Field
            name="city"
            label="City"
            component={InputField}
          />
          <Field
            name="Region"
            label="Region"
            component={InputField}
          />

          <Field
            name="postalCode"
            label="Postal code"
            component={InputField}
          />

          <Field
            name="country"
            label="Country"
            component={InputField}
          />

          <Field
            name="phone"
            label="Phone"
            component={InputField}
          />

          <Field
            name="fax"
            label="Fax"
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
  form: 'customer',
  validate,
})(CustomerForm);
