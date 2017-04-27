import React, { Component, PropTypes } from 'react';
import { isEmpty, debounce } from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { Form, Row, Col } from 'reactstrap';

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
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <Field
              name="category"
              label="Category"
              component={SelectField}
              options={categoriesOptions}
              onChange={onChange}
            />
          </Col>
          <Col md={8}>
            <Field
              name="title_contains"
              label="Title Contains"
              component={InputField}
              onChange={debounce(onChange, 500, 2000)}
            />
          </Col>
        </Row>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'postListFilter',
  destroyOnUnmount: false,
})(PostListFilter);
