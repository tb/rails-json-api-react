import { get, isEmpty, isNumber, set } from 'lodash';

export default function required(data, ...fields) {
  return fields.reduce((errors, field) => {
    const value = get(data, field);
    if (!isNumber(value) && isEmpty(value)) {
      set(errors, field, 'Required');
    }
    return errors;
  }, {});
}
