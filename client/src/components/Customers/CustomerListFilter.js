import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { Form, Row, Col } from 'reactstrap';

import { InputField, SelectField } from '../../forms';

class CustomerListFilter extends Component {
  render() {
    const { handleSubmit, onSubmit } = this.props;

    const submitOnChange = () => setTimeout(() => handleSubmit(onSubmit)(), 0);


    return (
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={8}>
            <Field
              name="company_name_contains"
              label="Company Name Contains"
              component={InputField}
              onChange={submitOnChange}
            />
          </Col>
        </Row>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'customerListFilter',
  destroyOnUnmount: false,
})(CustomerListFilter);
