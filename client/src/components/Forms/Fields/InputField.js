import React, { Component } from 'react';

class InputField extends Component {
  static defaultProps = {
    type: 'text',
  };

  render() {
    const { input, type, label, meta: { touched, error } } = this.props;

    return (
      <div>
        <label>{label}</label>
        <div>
          <input {...input} type={type} style={{ width: '500px' }} />
          {touched && (error && <div>{error}</div>)}
        </div>
      </div>
    );
  }
}

export default InputField;
