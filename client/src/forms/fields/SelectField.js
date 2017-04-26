import React, { Component } from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

class SelectField extends Component {
  render() {
    const { input, type, label, options, meta: { touched, error } } = this.props;
    const showError = touched && error;

    return (
      <FormGroup color={showError ? 'danger' : ''}>
        {label && <Label>{label}</Label>}
        <Input {...input} type="select">
          {options.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
        </Input>
        {showError && <FormFeedback>{error}</FormFeedback>}
      </FormGroup>
    );
  }
}

export default SelectField;
