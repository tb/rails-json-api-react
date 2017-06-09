import { omit } from 'lodash';

import {
  client,
  normalizeResponse,
  normalizeEndpointError,
  normalizeErrors,
  denormalize,
} from '../../api';

import {
  createAsyncActionType,
  createAsyncAction,
} from '../utils';

export const GET_ONE = createAsyncActionType('GET_ONE');
export const GET_LIST = createAsyncActionType('GET_LIST');
export const GET_MANY = createAsyncActionType('GET_MANY');
export const CREATE = createAsyncActionType('CREATE');
export const UPDATE = createAsyncActionType('UPDATE');
export const DELETE = createAsyncActionType('DELETE');
export const ACTION = createAsyncActionType('ACTION');

export const fetchOne = createAsyncAction(GET_ONE, (payload, meta) => client({
  url: `${meta.url}/${payload.id}`,
  params: { include: meta.include, ...omit(payload, 'id') },
  method: 'GET',
  data: JSON.stringify(payload),
}).then(normalizeResponse).catch(normalizeEndpointError));

export const fetchList = createAsyncAction(GET_LIST, (payload, meta) => {
  const params = { include: meta.include, ...payload };
  return client({
    url: meta.url,
    params,
    method: 'GET',
    data: JSON.stringify(payload),
  }).then(normalizeResponse).then(res => ({ ...res, params }));
});

export const createResource = createAsyncAction(CREATE, (payload, meta) => client({
  url: meta.url,
  params: { include: meta.include },
  method: 'POST',
  data: denormalize(meta.key, payload),
}).then(normalizeResponse).catch(normalizeErrors));

export const updateResource = createAsyncAction(UPDATE, (payload, meta) => client({
  url: `${meta.url}/${payload.id}`,
  params: { include: meta.include },
  method: 'PUT',
  data: denormalize(meta.key, payload),
}).then(normalizeResponse).catch(normalizeErrors));

export const deleteResource = createAsyncAction(DELETE, (payload, meta) => client({
  url: `${meta.url}/${payload.id}`,
  method: 'DELETE',
}).then(() => ({ data: payload })));

export const resourceAction = createAsyncAction(ACTION, (payload, meta = {}) => client({
  url: meta.url,
  params: { include: meta.include },
  method: meta.method || 'PUT',
  data: JSON.stringify(payload),
}).then(normalizeResponse).catch(normalizeErrors));
