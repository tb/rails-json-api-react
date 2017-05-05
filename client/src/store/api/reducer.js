import imm from 'object-path-immutable';
import {
  get,
  isEmpty,
  keyBy,
  keys,
  map,
  pick,
  without,
} from 'lodash';

import {
  GET_ONE,
  GET_LIST,
  GET_MANY,
  CREATE,
  UPDATE,
  DELETE,
} from './actions';

const addNormalized = (newState, payload) => {
  keys(payload.normalized).forEach((key) => {
    payload.normalized[key].forEach((item) => {
      newState = imm.assign(newState, [key, 'byId', item.id], item);
    });
  });
  return newState;
};

const initialState = {};

export default (state = initialState, { type, payload, meta }) => {
  const { key, list = 'list' } = meta || {};
  let newState = state;

  switch (type) {
    case GET_ONE.SUCCESS: {
      return addNormalized(newState, payload);
    }
    case GET_LIST.STARTED: {
      return imm.set(newState, [key, list, 'loading'], true);
    }
    case GET_LIST.SUCCESS: {
      newState = addNormalized(newState, payload);
      return imm.set(newState, [key, list], {
        ids: map(payload.data, 'id'),
        loading: false,
        ...pick(payload, ['params', 'links', 'meta']),
      });
    }
    case GET_MANY.SUCCESS: {
      return addNormalized(newState, payload);
    }
    case CREATE.SUCCESS: {
      newState = addNormalized(newState, payload);
      if (list) {
        newState = imm.push(newState, [key, list, 'ids'], payload.data.id);
      }
      return newState;
    }
    case UPDATE.SUCCESS: {
      return addNormalized(newState, payload);
    }
    case DELETE.SUCCESS: {
      newState = imm.del(newState, [key, 'byId', payload.data.id]);
      newState = imm.set(newState, [key, list, 'ids'],
        without(get(newState, [key, list, 'ids']), payload.data.id),
      );
      return newState;
    }
    default:
      return state;
  }
};
