import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureStore from './store/configureStore';
import history from './history';
import Routes from './containers/Routes';
import './styles/main.scss';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('app')
);

module.hot.accept();
