import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import DevTools from '../utils/DevTools';
import reducers from '../reducers';

module.exports = function(initialState) {
  let createStoreWithMiddleware;
  //if (__DEV__) {
  if (module.hot) {
    createStoreWithMiddleware = compose(
      applyMiddleware(thunkMiddleware),
      DevTools.instrument()
      //persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);

    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    });
  } else {
    createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
  }

  return createStoreWithMiddleware(reducers, initialState);
}
