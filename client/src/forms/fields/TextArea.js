import React, { Component } from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

class TextArea extends Component {
  static defaultProps = {
    type: 'textarea',
  };

  render() {
    const { input, type, label, rows, placeholder, meta: { touched, error } } = this.props;
    const showError = touched && error;

    return (
      <FormGroup color={showError ? 'danger' : ''}>
        {label && <Label>{label}</Label>}
        <Input {...input} type={type} placeholder={placeholder} rows={rows} />
        {showError && <FormFeedback>{error}</FormFeedback>}
      </FormGroup>
    );
  }
}

export default TextArea;
