import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import DevTools from './utils/DevTools';
import Home from './containers/Home';
import { Router, Route, browserHistory } from 'react-router'

const store = configureStore();

/* TDOD: Populated by sf-redux:component */

render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory}>
        <Route path="/" component={Home} />
      </Router>
      { !window.devToolsExtension ? <DevTools /> : null }
    </div>
  </Provider>,
  document.getElementById('app')
);
