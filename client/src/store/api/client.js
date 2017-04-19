import qs from 'qs';
import axios from 'axios';
import {
  castArray,
  get,
  isEmpty,
  toArray,
  groupBy,
  values,
  keys,
  zipObject,
} from 'lodash';

import { denormalize, normalize } from './normalize';

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

// client.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject({ error }),
// );

const stringifyParams = (params) => qs.stringify(params, { format: 'RFC1738', arrayFormat: 'brackets' });

const withParams = (url, params) => isEmpty(params) ? url : `${url}?${stringifyParams(params)}`;

const normalizeResponse = response => {
  const { data, included = [] } = response.data;
  const dataByType = groupBy(castArray(data).concat(included), 'type');

  const normalizeItems = (items = []) => Promise.all(items.map(item =>
    normalize(item.type, {data: item, included})
  ));

  return Promise.all(values(dataByType).map(normalizeItems))
    .then(normalizedItems => ({
      ...response.data,
      normalized: zipObject(keys(dataByType), normalizedItems),
    }));
};

export default (request, payload, meta) => {
  const {
    url = `${meta.key}`,
  } = meta;

  const params = payload;

  switch(request) {
    case GET_ONE:
      return client({
        url: withParams(`${url}/${payload.id}`, params),
        method: 'GET',
        data: JSON.stringify(payload),
      }).then(normalizeResponse);
    case GET_MANY:
    case GET_LIST:
      return client({
        url: withParams(`${url}`, params),
        method: 'GET',
        data: JSON.stringify(payload),
      }).then(normalizeResponse);
    case CREATE:
      return client({
        url: withParams(url),
        method: 'POST',
        data: denormalize(meta.key, payload),
      }).then(normalizeResponse);
    case UPDATE: {
      return client({
        url: withParams(`${url}/${payload.id}`),
        method: 'PUT',
        data: denormalize(meta.key, payload),
      }).then(normalizeResponse);
    }
    case DELETE:
      return client({
        url: withParams(`${url}/${payload.id}`),
        method: 'DELETE',
      }).then(response => normalizeResponse({ data: payload }));
    default:
      throw `No client handler for ${request}`;
  }
};
