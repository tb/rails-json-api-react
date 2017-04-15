import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import { Provider } from 'react-redux';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Routes from './components/Routes';
import configureStore from './store/configureStore';

WebFont.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

import './index.scss';

const store = configureStore(hashHistory);
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Routes history={history} />
  </Provider>,
  document.getElementById('root'),
);
