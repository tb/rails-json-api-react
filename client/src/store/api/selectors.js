import { get, isEmpty } from 'lodash';

export const getUser = (state) => get(state, ['api', 'user']) || {};

export const getOne = (state, key, id) => get(state, ['api', key, 'byId', id]) || {};

export const getMap = (state, key) => get(state, ['api', key, 'byId']) || {};

export const getMany = (state, key, ids) => {
  const { byId } = get(state, ['api', key]) || {};

  return isEmpty(byId)
    ? []
    : (ids || Object.keys(byId)).map(id => byId[id]);
};

export const getList = (state, key) => {
  const { byId, list } = get(state, ['api', key]) || {};
  return isEmpty(list)
    ? { data: [], ids: [], links: {}, params: { page: {}, filter: {} } }
    : { ...list, data: list.ids.map(id => byId[id]) }
};
