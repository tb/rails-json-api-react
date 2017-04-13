import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { InputField, SelectField } from '../Forms';

class PostListFilter extends Component {
  render() {
    const { handleSubmit, onSubmit, categories } = this.props;

    const categoriesOptions = categories.map(category => ({
      id: category.id,
      name: category.attributes.name,
    }));
    categoriesOptions.unshift({ id: "", name: 'All categories'})

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="title_contains" label="Title Contains" component={InputField}
            onBlur={() => handleSubmit(onSubmit)()} />
          <Field name="category" label="Category" component={SelectField} options={categoriesOptions}
            onBlur={() => handleSubmit(onSubmit)()} />
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'postListFilter',
  destroyOnUnmount: false,
})(PostListFilter);
