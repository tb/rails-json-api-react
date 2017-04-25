import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { Field, reduxForm } from 'redux-form';

import { InputField, required } from '../../forms';

class CategoryForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="name" component={InputField} />
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Undo Changes</button>
        </div>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = required(values, 'name');
  return errors;
};

export default reduxForm({
  enableReinitialize: true,
  form: 'category',
  validate,
})(CategoryForm);
