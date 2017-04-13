import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { Field, reduxForm } from 'redux-form';

import { InputField, TextArea, SelectField, required } from '../Forms';

class PostForm extends Component {
  render() {
    const { categories, handleSubmit, pristine, reset, submitting } = this.props;

    const categoriesOptions = categories.map(category => ({
      id: category.id,
      name: category.name,
    }));

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="title" component={InputField} />
        </div>
        <div>
          <Field name="category.id" component={SelectField}
                 options={categoriesOptions} />
        </div>
        <div>
          <Field name="body" component={TextArea} rows="10" />
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Undo Changes</button>
        </div>
      </form>
    );
  }
}

const validate = values => {
  const errors = required(values,
    'title',
    'category.id',
    'body'
  );
  return errors;
};

export default reduxForm({
  enableReinitialize: true,
  form: 'post',
  validate,
})(PostForm);
