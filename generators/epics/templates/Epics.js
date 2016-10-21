import {actionTypes as fooTypes} from '../<%= prefix %>components/Foo';
import {actionTypes as barTypes} from '../<%= prefix %>modules/Bar';

export const pingEpic = action$ =>
  action$.ofType( fooTypes.PING )
    .mapTo({ type: barTypes.PONG });