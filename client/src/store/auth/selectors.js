import { get } from 'lodash';

export const getUser = state =>
  get(state, ['auth', 'user']) || {};
