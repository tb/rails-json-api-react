import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { InputField } from '../Forms';

class PostListFilter extends Component {
  render() {
    const { handleSubmit, onSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="title_contains" label="Title Contains" component={InputField}
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
