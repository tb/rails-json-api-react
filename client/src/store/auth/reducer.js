import imm from 'object-path-immutable';

import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
} from './actions';

const initialState = {
  user: JSON.parse(localStorage.getItem('user') || '{}'),
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_LOGIN.SUCCESS: {
      localStorage.setItem('user', JSON.stringify(payload));
      return imm.set(state, ['user'], payload);
    }
    case AUTH_LOGOUT.SUCCESS: {
      localStorage.removeItem('user');
      return imm.set(state, ['user'], {});
    }
    default:
      return state;
  }
};
