import { get, map, keyBy, isEmpty } from 'lodash';

export const getOne = (state, key, id) => get(state, ['api', key, 'byId', id]) || {
  attributes: {},
  relationships: {},
};

export const getMap = (state, key) => get(state, ['api', key, 'byId']) || {};

export const getMany = (state, key, ids) => {
  const { byId } = get(state, ['api', key]) || {};

  return isEmpty(byId)
    ? []
    : (ids || Object.keys(byId)).map(id => byId[id]);
};

export const getRelation = (state, key, id, relation) => {
  const parent = getOne(state, key, id);

  if (!parent.id) {
    return {
      attributes: {},
      relationships: {},
    };
  }

  const relationData = get(parent, ['relationships', relation, 'data']);

  if (!relationData) {
    return {
      attributes: {},
      relationships: {},
    };
  }

  return getOne(state, relationData.type, relationData.id);
};

export const getList = (state, key) => {
  const { byId, list } = get(state, ['api', key]) || {};
  return isEmpty(list)
    ? { data: [], ids: [], links: {} }
    : { ...list, data: list.ids.map(id => byId[id]) }
};
