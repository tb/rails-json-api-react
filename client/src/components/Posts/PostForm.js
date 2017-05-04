import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { Field, FieldArray, formValueSelector, reduxForm } from 'redux-form';
import { Button, Form, FormFeedback, Col, Row } from 'reactstrap';

import { InputField, TextArea, SelectField, required } from '../../forms';

export const PostFormPart = ({values, part}) => {
  switch(values.type) {
    case 'image':
      return (
        <div>
          <img src={values.imageUrl} />
          <div>{values.description}</div>
          <Field
            name={`${part}.imageUrl`}
            placeholder={'Image url...'}
            component={InputField}
          />          <Field
          name={`${part}.description`}
          placeholder={'Image description...'}
          component={InputField}
        />
        </div>
      );
    case 'text':
      return (
        <Field
          name={`${part}.text`}
          placeholder={'Text...'}
          rows={5}
          component={TextArea}
        />
      );
  };
};

export const PostFormParts = ({ parts, fields, meta: { error } }) => (
  <div className="my-3">
    {fields.map((part, index) =>
      <div>
        <hr />
        <Row key={index}>
          <Col xs="10">
            <PostFormPart values={parts[index]} part={part} />
          </Col>
          <Col xs="2">
            <Button color="danger" onClick={() => fields.remove(index)}>X</Button>
          </Col>
        </Row>
      </div>
    )}
    {error && <FormFeedback>{error}</FormFeedback>}
    <Button onClick={() => fields.push({ type: 'text' })} className="mr-2">Add Text</Button>
    <Button onClick={() => fields.push({ type: 'image' })}>Add Image</Button>
  </div>
);

export class PostForm extends Component {
  render() {
    const { parts, categories, handleSubmit, pristine, reset, submitting } = this.props;

    const categoriesOptions = [{
      id: '',
      name: '-- select category --',
    }].concat(categories.map(category => ({
      id: category.id,
      name: category.name,
    })));

    return (
      <Form onSubmit={handleSubmit} className="py-3">
        <Field
          name="title"
          label="Title"
          component={InputField}
        />
        <Field
          name="category.id"
          label="Category"
          component={SelectField}
          options={categoriesOptions}
        />
        <FieldArray
          name="parts"
          parts={parts}
          component={PostFormParts}
        />
        <Button disabled={pristine || submitting} color="primary" className="mr-2">Submit</Button>
        <Button disabled={pristine || submitting} onClick={reset}>Undo Changes</Button>
      </Form>
    );
  }
}

const validate = (values) => {
  const errors = required(values,
    'title',
    'category.id',
  );
  return errors;
};

const selector = formValueSelector('post');

export const mapStateToProps = (state) => ({
  parts: selector(state, 'parts'),
});

export default reduxForm({
  enableReinitialize: true,
  form: 'post',
  validate,
})(
  connect(mapStateToProps)(PostForm)
);
