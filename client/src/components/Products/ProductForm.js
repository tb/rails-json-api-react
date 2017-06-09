import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { Button, Form } from 'reactstrap';

import { InputField, MultiselectField, required } from '../../forms';

class ProductForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <div>
          <Field
            name="productName"
            label="Name"
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
  const errors = required(values, 'productName');
  return errors;
};

export default reduxForm({
  enableReinitialize: true,
  form: 'product',
  validate,
})(ProductForm);
