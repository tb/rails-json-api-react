import imm from 'object-path-immutable';
import {
  get,
  map,
  keys,
  keyBy,
  isEmpty,
  without,
} from 'lodash';

import {
  GET_ONE,
  GET_LIST,
  GET_MANY,
  CREATE,
  UPDATE,
  DELETE,
  AUTH_LOGIN,
  AUTH_LOGOUT,
} from './client';

import {
  STARTED,
  SUCCESS,
  FAILED,
  actionType,
} from './actions';

const initialState = {
  user: JSON.parse(localStorage.getItem('user') || '{}'),
};

const addNormalized = (newState, payload) => {
  keys(payload.normalized).forEach(key => {
    payload.normalized[key].forEach(item => {
      newState = imm.assign(newState, [key, 'byId', item.id], item);
    });
  });
  return newState;
};

export default (state = initialState, action) => {
  const { type, payload, meta } = action;
  const { key } = meta || {};
  let newState = state;

  switch (type) {
    case actionType(GET_ONE, SUCCESS): {
      return addNormalized(newState, payload);
    }
    case actionType(GET_LIST, SUCCESS): {
      newState = addNormalized(newState, payload);
      newState = imm.set(newState, [key, 'list', 'ids'], map(payload.data, 'id'));
      newState = imm.set(newState, [key, 'list', 'params'], payload.params);
      newState = imm.set(newState, [key, 'list', 'links'], payload.links);
      newState = imm.set(newState, [key, 'list', 'meta'], payload.meta);
      return newState;
    }
    case actionType(GET_MANY, SUCCESS): {
      return addNormalized(newState, payload);
    }
    case actionType(CREATE, SUCCESS): {
      return addNormalized(newState, payload);
    }
    case actionType(UPDATE, SUCCESS): {
      return addNormalized(newState, payload);
    }
    case actionType(DELETE, SUCCESS): {
      newState = imm.del(newState, [key, 'byId', payload.data.id]);
      newState = imm.set(newState, [key, 'list', 'ids'],
        without(get(newState, [key, 'list', 'ids']), payload.data.id)
      );
      return newState;
    }
    case actionType(AUTH_LOGIN, SUCCESS): {
      localStorage.setItem('user', JSON.stringify(payload));
      newState = imm.set(newState, ['user'], payload);
      return newState;
    }
    case actionType(AUTH_LOGOUT, SUCCESS): {
      localStorage.removeItem('user');
      newState = imm.set(newState, ['user'], {});
      return newState;
    }
    default:
      return state
  }
};
