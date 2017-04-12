import imm from 'object-path-immutable';
import { get, map, keyBy, isEmpty, without } from 'lodash';

import {
  GET_ONE,
  GET_LIST,
  GET_MANY,
  CREATE,
  UPDATE,
  DELETE,
} from './client';

import {
  STARTED,
  SUCCESS,
  FAILED,
  actionType,
} from './actions';

const initialState = {};

const addIncluded = (newState, included = []) => {
  included.forEach(data => {
    newState = imm.assign(newState, [data.type, 'byId'], keyBy([data], 'id'));
  });

  return newState;
};

export default (state = initialState, action) => {
  const { type, payload, meta } = action;
  const { key } = meta || {};
  let newState = state;

  switch (type) {
    case actionType(GET_ONE, SUCCESS): {
      newState = imm.assign(newState, [key, 'byId'], keyBy([payload.data], 'id'));
      newState = addIncluded(newState, payload.included);
      return newState;
    }
    case actionType(GET_LIST, SUCCESS): {
      newState = imm.assign(newState, [key, 'byId'], keyBy(payload.data, 'id'));
      newState = imm.set(newState, [key, 'list', 'ids'], map(payload.data, 'id'));
      newState = imm.set(newState, [key, 'list', 'links'], payload.links);
      newState = imm.set(newState, [key, 'list', 'meta'], payload.meta);
      newState = addIncluded(newState, payload.included);
      return newState;
    }
    case actionType(GET_MANY, SUCCESS): {
      newState = imm.assign(newState, [key, 'byId'], keyBy(payload.data, 'id'));
      newState = addIncluded(newState, payload.included);
      return newState;
    }
    case actionType(CREATE, SUCCESS): {
      newState = imm.assign(newState, [key, 'byId'], keyBy([payload.data], 'id'));
      return newState;
    }
    case actionType(UPDATE, SUCCESS): {
      newState = imm.assign(newState, [key, 'byId'], keyBy([payload.data], 'id'));
      return newState;
    }
    case actionType(DELETE, SUCCESS): {
      newState = imm.del(newState, [key, 'byId', payload.data.id]);
      newState = imm.set(newState, [key, 'list', 'ids'],
        without(get(newState, [key, 'list', 'ids']), payload.data.id)
      );
      return newState;
    }
    default:
      return state
  }
};
