import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { reducer as api } from 'redux-json-api';
import { setEndpointHost, setEndpointPath } from 'redux-json-api';
import { reducer as formReducer } from 'redux-form'

const composeEnhancers =
  process.env.NODE_ENV === 'production'
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (history) => {
  const reducer = combineReducers({
    api,
    routing: routerReducer,
    form: formReducer,
  });

  const routingMiddleware = routerMiddleware(history);

  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(
      routingMiddleware,
      thunkMiddleware,
    )),
  );

  store.dispatch(setEndpointHost('http://localhost:8080'));
  store.dispatch(setEndpointPath(''));

  return store;
}
