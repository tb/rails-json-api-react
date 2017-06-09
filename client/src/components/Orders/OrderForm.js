import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Col, Row } from 'reactstrap';

import { InputField, required } from '../../forms';

class OrderForm extends Component {
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
              name="orderDate"
              label="Order date"
              component={InputField}
              onChange={submitOnChange}
            />
            <Field
              name="shippedDate"
              label="Shipped date"
              component={InputField}
              onChange={submitOnChange}
            />
            <Field
              name="shipAddress"
              label="Ship address"
              component={InputField}
              onChange={submitOnChange}
            />
            <Field
              name="shipCity"
              label="Ship city"
              component={InputField}
              onChange={submitOnChange}
            />
            <Field
              name="shipRegion"
              label="Ship region"
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

export default reduxForm({
  enableReinitialize: true,
  form: 'order',
})(OrderForm);
