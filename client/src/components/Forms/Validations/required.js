import { isEmpty, isNumber } from 'lodash';

export default function required(data, ...fields) {
  return fields.reduce((errors, field) => {
    const value = data[field];
    if (!isNumber(value) && isEmpty(value)) {
      errors[field] = 'Required';
    }
    return errors;
  }, {});
}
