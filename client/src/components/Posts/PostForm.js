import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { Button, Form } from 'reactstrap';

import { InputField, TextArea, SelectField, required } from '../../forms';

class PostForm extends Component {
  render() {
    const { categories, handleSubmit, pristine, reset, submitting } = this.props;

    const categoriesOptions = [{
      id: '',
      name: '-- select category --',
    }].concat(categories.map(category => ({
      id: category.id,
      name: category.name,
    })));

    return (
      <Form onSubmit={handleSubmit}>
        <Field
          name="title"
          label="Title"
          component={InputField}
        />
        <Field
          name="category.id"
          label="Category"
          component={SelectField}
          options={categoriesOptions}
        />
        <Field
          name="body"
          label="Body"
          component={TextArea}
          rows="10"
        />
        <Button disabled={pristine || submitting} color="primary">Submit</Button>
        <Button disabled={pristine || submitting} onClick={reset}>Undo Changes</Button>
      </Form>
    );
  }
}

const validate = (values) => {
  const errors = required(values,
    'title',
    'category.id',
    'body',
  );
  return errors;
};

export default reduxForm({
  enableReinitialize: true,
  form: 'post',
  validate,
})(PostForm);
