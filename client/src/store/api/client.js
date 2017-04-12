import qs from 'qs';
import axios from 'axios';
import { isEmpty, toArray } from 'lodash';

export const GET_ONE = 'GET_ONE';
export const GET_LIST = 'GET_LIST';
export const GET_MANY = 'GET_MANY';
export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const DELETE = 'DELETE';

const client = axios.create({
  baseURL: '/',
  headers: {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  },
});

const stringifyParams = (params) => qs.stringify(params, { format: 'RFC1738', arrayFormat: 'brackets' });

const withParams = (url, params) => isEmpty(params) ? url : `${url}?${stringifyParams(params)}`;

export default (request, payload, meta) => {
  const {
    url = `${meta.key}`,
  } = meta;

  const params = payload;

  switch(request) {
    case CREATE:
      return client({
        url: withParams(url),
        method: 'POST',
        data: { data: payload },
      }).then(response => response.data);
    case UPDATE:
      return client({
        url: withParams(`${url}/${payload.id}`),
        method: 'PUT',
        data: { data: payload },
      }).then(response => response.data);
    case DELETE:
      return client({
        url: withParams(`${url}/${payload.id}`),
        method: 'DELETE',
      }).then(response => ({ data: payload }));
    case GET_ONE:
      return client({
        url: withParams(`${url}/${payload.id}`, params),
        method: 'GET',
        data: JSON.stringify(payload),
      }).then(response => response.data);
    default:
      return client({
        url: withParams(`${url}`, params),
        method: 'GET',
        data: JSON.stringify(payload),
      }).then(response => response.data);
  }
};
