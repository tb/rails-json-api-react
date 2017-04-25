import React, { Component } from 'react';

class SelectField extends Component {
  render() {
    const { input, type, label, options, meta: { touched, error } } = this.props;

    return (
      <div>
        <label>{label}</label>
        <div>
          <select {...input} type={type} style={{ width: '500px' }}>
            {options.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
          </select>
          {touched && (error && <div>{error}</div>)}
        </div>
      </div>
    );
  }
}

export default SelectField;
