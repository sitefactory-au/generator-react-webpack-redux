import {createStore, applyMiddleware, compose} from 'redux';
import DevTools from '../utils/DevTools';
import reducers from '../reducers';
import { rootEpic } from '../app/epics';
import { history } from '../services/router'; 
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';

module.exports = function(initialState) {
  let createStoreWithMiddleware;
  
  var routerMiddleware = createRouterMiddleware(history);
  var epicMiddleware = createEpicMiddleware( rootEpic );
 
  var storeEnhancer = applyMiddleware( epicMiddleware, routerMiddleware );
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  //if (__DEV__) {
  if (module.hot) {
    createStoreWithMiddleware = composeEnhancers(
      storeEnhancer,
      //window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
      //persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);

    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      createStoreWithMiddleware.replaceReducer(nextReducer)
    });
  } else {
    createStoreWithMiddleware = storeEnhancer(createStore);
  }

  return createStoreWithMiddleware(reducers, initialState);
}
