import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { reducer as api } from 'redux-json-api';
import { setEndpointHost, setEndpointPath } from 'redux-json-api';

export default () => {
  const reducer = combineReducers({
    api,
    routing: routerReducer,
  });

  const routingMiddleware = routerMiddleware(browserHistory);

  const store = createStore(
    reducer,
    applyMiddleware(
      routingMiddleware,
      thunkMiddleware,
    )
  );

  store.dispatch(setEndpointHost('http://localhost:3000'));
  store.dispatch(setEndpointPath(''));

  return store;
}
