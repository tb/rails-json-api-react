import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { InputField, TextArea, SelectField } from '../Forms';

class PostForm extends Component {
  componentWillUpdate(nextProps) {
    if (!isEmpty(nextProps.initialValues) && !this.props.initialized) {
      this.props.initialize(nextProps.initialValues);
    }
  }

  render() {
    const { initialValues, categories, handleSubmit, pristine, reset, submitting } = this.props;

    const categoriesOptions = categories.map(category => ({
      id: category.id,
      name: category.attributes.name,
    }));

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="title" component={InputField} />
        </div>
        <div>
          <Field name="category_id" component={SelectField} options={categoriesOptions} />
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
  const errors = {};
  ['title'].forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });
  return errors;
};

export default reduxForm({
  enableReinitialize: true,
  form: 'post',
  validate,
})(PostForm);
