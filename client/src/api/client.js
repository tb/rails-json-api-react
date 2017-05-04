import qs from 'qs';
import axios from 'axios';
import {
  castArray,
  get,
  groupBy,
  keys,
  pick,
  set,
  values,
  zipObject,
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

client.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = '/#/login';
    }
    return Promise.reject(error);
  },
);

client.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user['access-token']) {
      config.headers['x-jwt-token'] = 'Bearer';
      config.headers.client = user.client;
      config.headers['access-token'] = user['access-token'];
      config.headers.uid = user.uid;
    }
    return config;
  },
  error => Promise.reject(error),
);

const stringifyParams = params => qs.stringify(params, { format: 'RFC1738', arrayFormat: 'brackets' });

const withParams = (url, params) => `${url}?${stringifyParams(params)}`;

const normalizeResponse = (response) => {
  const { data = [], included = [] } = response.data;
  const dataByType = groupBy(castArray(data).concat(included), 'type');

  const normalizeItems = (items = []) => Promise.all(items.map(item =>
    normalize(item.type, { data: item, included }),
  ));

  return Promise.all(values(dataByType).map(normalizeItems))
    .then(normalizedItems => ({
      ...response.data,
      normalized: zipObject(keys(dataByType), normalizedItems),
    }));
};

const normalizeErrors = (response) => {
  throw get(response, 'response.data.errors')
    .reduce((errors, error) => {
      const attribute = /\/data\/[a-z]*\/(.*)$/.exec(get(error, 'source.pointer'))[1];
      set(errors, attribute.split('/'), error.title);
      return errors;
    }, {});
};

export default (requestType, payload, meta) => {
  const {
    url = `${meta.key}`,
    include,
  } = meta;

  const params = payload;

  switch (requestType) {
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
      }).then(normalizeResponse).then(res => ({ ...res, params }));
    case CREATE:
      return client({
        url: withParams(url, { include }),
        method: 'POST',
        data: denormalize(meta.key, payload),
      }).then(normalizeResponse).catch(normalizeErrors);
    case UPDATE: {
      return client({
        url: withParams(`${url}/${payload.id}`, { include }),
        method: 'PUT',
        data: denormalize(meta.key, payload),
      }).then(normalizeResponse).catch(normalizeErrors);
    }
    case DELETE:
      return client({
        url: withParams(`${url}/${payload.id}`),
        method: 'DELETE',
      }).then(() => ({ data: payload }));
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
      throw new Error(`No client handler for ${requestType}`);
  }
};
