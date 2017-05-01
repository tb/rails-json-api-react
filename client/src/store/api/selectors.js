import { get, isEmpty } from 'lodash';

export const getUser = state =>
  get(state, ['api', 'user']) || {};

export const getOne = (state, resourceName, id) =>
  get(state, ['api', resourceName, 'byId', id]) || {};

export const getMap = (state, resourceName) =>
  get(state, ['api', resourceName, 'byId']) || {};

export const getMany = (state, resourceName, ids) => {
  const byId = get(state, ['api', resourceName, 'byId']);
  return isEmpty(byId)
    ? []
    : (ids || Object.keys(byId)).map(id => byId[id]);
};

export const getList = (state, resourceName, listName = 'list') => {
  const byId = get(state, ['api', resourceName, 'byId']) || {};
  const list = get(state, ['api', resourceName, listName]) || {};
  return isEmpty(list)
    ? { data: [], ids: [], links: {}, params: { page: {}, filter: {} } }
    : { ...list, data: list.ids.map(id => byId[id]) };
};
