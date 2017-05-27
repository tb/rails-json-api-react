import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Col, Row } from 'reactstrap';

import { InputField, required } from '../../forms';

class CategoryForm extends Component {
  render() {
    const { handleSubmit, onSubmit, onDelete, reset, isNew, submitSucceeded } = this.props;

    if (isNew && submitSucceeded) {
      setTimeout(() => reset());
    }

    const submitOnChange = () => {
      if (!isNew) {
        setTimeout(() => handleSubmit(onSubmit)(), 0);
      }
    };

    return (
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs="10" sm="8" md="6">
            <Field
              name="name"
              component={InputField}
              onChange={submitOnChange}
            />
          </Col>
          <Col xs="2">
            {
              isNew
              ? <Button color="success">+</Button>
              : <Button color="danger" onClick={onDelete}>X</Button>
            }
          </Col>
        </Row>
      </Form>
    );
  }
}

const validate = (values) => {
  const errors = required(values, 'name');
  return errors;
};

export default reduxForm({
  enableReinitialize: true,
  validate,
})(CategoryForm);
