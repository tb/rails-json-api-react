import { pick } from 'lodash';

import { client } from '../../api';
import { createAsyncActionType, createAsyncAction } from '../utils';

export const AUTH_LOGIN = createAsyncActionType('AUTH_LOGIN');
export const AUTH_LOGOUT = createAsyncActionType('AUTH_LOGOUT');

export const login = createAsyncAction(AUTH_LOGIN, payload => client({
  url: 'auth/sign_in',
  method: 'POST',
  data: payload,
}).then(response => ({
  ...response.data.data,
  ...pick(response.headers, ['access-token', 'client']),
})).catch(({ response }) => {
  throw new Error(response.data.errors.join());
}));

export const logout = createAsyncAction(AUTH_LOGOUT, payload => client({
  url: 'auth/sign_out',
  method: 'DELETE',
  data: payload,
}));
