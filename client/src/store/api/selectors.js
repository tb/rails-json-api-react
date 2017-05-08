import { compact, get, isEmpty } from 'lodash';

export const getOne = (state, resourceName, id) =>
  get(state, ['api', resourceName, 'byId', id]);

export const getError = (state, resourceName) =>
  get(state, ['api', resourceName, 'error']);

export const getMap = (state, resourceName) =>
  get(state, ['api', resourceName, 'byId']) || {};

export const getMany = (state, resourceName, ids) => {
  const byId = get(state, ['api', resourceName, 'byId']);
  return isEmpty(byId)
    ? []
    : (ids || Object.keys(byId)).map(id => byId[id]);
};

const emptyList = {
  data: [],
  ids: [],
  links: {},
  meta: {},
  params: { page: {}, filter: {} },
  loading: true,
};

export const getList = (state, resourceName, listName = 'list') => {
  const byId = get(state, ['api', resourceName, 'byId']) || {};
  const list = get(state, ['api', resourceName, listName]) || {};

  return !list.ids
    ? { ...emptyList, empty: true }
    : { ...emptyList, empty: false, ...list, data: compact(list.ids.map(id => byId[id])) };
};
