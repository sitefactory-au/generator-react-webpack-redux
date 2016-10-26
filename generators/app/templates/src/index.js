import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './stores';
import DevTools from './utils/DevTools';
import { Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './pages/Home';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createRenderer } from 'fela';
import { Provider as  FelaProvider } from 'react-fela';
import { history } from './services/router';

injectTapEventPlugin();

const store = configureStore();
const syncedHistory = syncHistoryWithStore(history, store);
const renderer = createRenderer();
const mountNode = document.getElementById('stylesheet');


/* TDOD: Populated by sf-redux:component */

render(
  <ReduxProvider store={store}>
    <FelaProvider renderer={renderer} mountNode={mountNode}>
      <MuiThemeProvider>
        <div>
          <Router history={syncedHistory}>
            <Route path="/" component={Home} />
          </Router>
          { !window.devToolsExtension ? <DevTools /> : null }
        </div>
      </MuiThemeProvider>
    </FelaProvider>
  </ReduxProvider>,
  document.getElementById('app')
);
