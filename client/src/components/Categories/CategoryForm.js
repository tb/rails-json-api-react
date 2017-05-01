import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Col, Row } from 'reactstrap';

import { InputField, required } from '../../forms';

class CategoryForm extends Component {
  render() {
    const { handleSubmit, onDelete, reset, isNew, submitSucceeded } = this.props;

    if (isNew && submitSucceeded) {
      setTimeout(() => reset());
    }

    return (
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs="10" sm="8" md="6">
            <Field
              name="name"
              component={InputField}
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
