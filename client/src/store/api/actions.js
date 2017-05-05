import {
  client,
  withParams,
  normalizeResponse,
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

export const fetchOne = createAsyncAction(GET_ONE, (payload, meta) => client({
  url: withParams(meta.url, { include: meta.include, ...payload }),
  method: 'GET',
  data: JSON.stringify(payload),
}).then(normalizeResponse));

export const fetchList = createAsyncAction(GET_LIST, (payload, meta) => {
  const params = { include: meta.include, ...payload };
  return client({
    url: withParams(meta.url, params),
    method: 'GET',
    data: JSON.stringify(payload),
  }).then(normalizeResponse).then(res => ({ ...res, params }));
});

export const createResource = createAsyncAction(CREATE, (payload, meta) => client({
  url: withParams(meta.url, { include: meta.include }),
  method: 'POST',
  data: denormalize(meta.key, payload),
}).then(normalizeResponse).catch(normalizeErrors));

export const updateResource = createAsyncAction(UPDATE, (payload, meta) => client({
  url: withParams(`${meta.url}/${payload.id}`, { include: meta.include }),
  method: 'PUT',
  data: denormalize(meta.key, payload),
}).then(normalizeResponse).catch(normalizeErrors));

export const deleteResource = createAsyncAction(DELETE, (payload, meta) => client({
  url: withParams(`${meta.url}/${payload.id}`),
  method: 'DELETE',
}).then(() => ({ data: payload })));
