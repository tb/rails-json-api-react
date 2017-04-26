import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { Field, reduxForm } from 'redux-form';

import { InputField, SelectField } from '../../forms';

class PostListFilter extends Component {
  render() {
    const { handleSubmit, onSubmit, categories } = this.props;

    const onChange = () => setTimeout(() => handleSubmit(onSubmit)(), 0);

    const categoriesOptions = [{
      id: '',
      name: 'All categories',
    }].concat(categories.map(category => ({
      id: category.id,
      name: category.name,
    })));

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="title_contains" label="Title Contains" component={InputField}
            onChange={onChange} />
          <Field name="category" label="Category" component={SelectField} options={categoriesOptions}
            onChange={onChange} />
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'postListFilter',
  destroyOnUnmount: false,
})(PostListFilter);
