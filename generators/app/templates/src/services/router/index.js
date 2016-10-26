import * as reduxRouter from 'react-router-redux';
import { browserHistory } from 'react-router';

export const push = reduxRouter.push;
export const replace = reduxRouter.replace;
export const go = reduxRouter.go;
export const goForward = reduxRouter.goForward;
export const goBack = reduxRouter.goBack;

export const history = browserHistory;
