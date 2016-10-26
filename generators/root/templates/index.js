import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './stores';
import DevTools from './utils/DevTools';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './pages/Home';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createRenderer } from 'fela';
import { Provider as  FelaProvider } from 'react-fela';

injectTapEventPlugin();

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const renderer = createRenderer();
const mountNode = document.getElementById('stylesheet');


/* TDOD: Populated by sf-redux:component */

render(
  <ReduxProvider store={store}>
    <FelaProvider renderer={renderer} mountNode={mountNode}>
      <MuiThemeProvider>
        <div>
          <Router history={history}>
            <Route path="/" component={Home} />
          </Router>
          { !window.devToolsExtension ? <DevTools /> : null }
        </div>
      </MuiThemeProvider>
    </FelaProvider>
  </ReduxProvider>,
  document.getElementById('app')
);
