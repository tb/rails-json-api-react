import React, { Component } from 'react';

class TextArea extends Component {
  static defaultProps = {
    type: 'text',
  };

  render() {
    const { input, label, rows, meta: { touched, error } } = this.props;

    return (
      <div>
        <label>{label}</label>
        <div>
          <textarea {...input} rows={rows} style={{ width: '500px' }} />
          {touched && (error && <div>{error}</div>)}
        </div>
      </div>
    );
  }
}

export default TextArea;
