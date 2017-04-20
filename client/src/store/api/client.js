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
  pick,
} from 'lodash';

import { denormalize, normalize } from './normalize';

export const GET_ONE = 'GET_ONE';
export const GET_LIST = 'GET_LIST';
export const GET_MANY = 'GET_MANY';
export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const DELETE = 'DELETE';
export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

const client = axios.create({
  baseURL: '/',
  headers: {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  },
});

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

const normalizeErrors = response => {
  throw get(response, 'response.data.errors')
    .reduce((errors, error) => {
      const attribute = /attributes\/(.*)$/.exec(get(error, 'source.pointer'))[1];
      errors[attribute] = error.title;
      return errors;
    }, {});
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
      }).then(normalizeResponse).then((res) => ({...res, params}));
    case CREATE:
      return client({
        url: withParams(url),
        method: 'POST',
        data: denormalize(meta.key, payload),
      }).then(normalizeResponse).catch(normalizeErrors);
    case UPDATE: {
      return client({
        url: withParams(`${url}/${payload.id}`),
        method: 'PUT',
        data: denormalize(meta.key, payload),
      }).then(normalizeResponse).catch(normalizeErrors);
    }
    case DELETE:
      return client({
        url: withParams(`${url}/${payload.id}`),
        method: 'DELETE',
      }).then(response => normalizeResponse({ data: payload }));
    case AUTH_LOGIN:
      return client({
        url: 'auth/sign_in',
        method: 'POST',
        data: payload,
      }).then(response => ({
        ...response.data.data,
        ...pick(response.headers, ['access-token', 'client']),
      }));
    case AUTH_LOGOUT:
      return client({
        url: 'auth/sign_out',
        method: 'DELETE',
        data: payload,
      });
    default:
      throw `No client handler for ${request}`;
  }
};
