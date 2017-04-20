import client, {
  GET_ONE,
  GET_LIST,
  GET_MANY,
  CREATE,
  UPDATE,
  DELETE,
  AUTH_LOGIN,
  AUTH_LOGOUT,
} from './client';

export const STARTED = 'STARTED';
export const SUCCESS = 'SUCCESS';
export const FAILED = 'FAILED';

export const actionType = (request, status) => `@@api/${request}/${status}`;

const createAction = (request, status) => (key, payload, meta = {}) => ({
  type: actionType(request, status),
  payload,
  meta: {...meta, status},
  error: status === FAILED ? true : undefined,
});

const createAsyncAction = (request) => (key, payload = {}, _meta = {}) => (dispatch) => {
  const meta = { ..._meta, key, request };
  dispatch(createAction(request, STARTED)(key, payload, meta));
  return client(request, payload, meta)
    .then(response => {
      dispatch(createAction(request, SUCCESS)(key, response, meta));
      return response;
    })
    .catch(error => {
      dispatch(createAction(request, FAILED)(key, error, meta));
      throw error;
    });
};

export const fetchOne = createAsyncAction(GET_ONE);
export const fetchList = createAsyncAction(GET_LIST);
export const fetchMany = createAsyncAction(GET_MANY);
export const createResource = createAsyncAction(CREATE);
export const updateResource = createAsyncAction(UPDATE);
export const deleteResource = createAsyncAction(DELETE);
export const login = createAsyncAction(AUTH_LOGIN);
export const logout = createAsyncAction(AUTH_LOGOUT);
