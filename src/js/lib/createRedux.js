import _ from 'lodash';
import { createDispatcher, createRedux, composeStores } from 'redux';
import * as reducers from '../reducers';

function promiseMiddleware(api, getState) {
  return next =>
    function _r(action) {
      if (action && _.isFunction(action.then)) {
        return action.then(_r);
      }

      if (_.isFunction(action)) {
        return _r(action(api, getState));
      }

      return next(action);
    };
}

export default function (api, initialState) {
  const dispatcher = createDispatcher(
    composeStores(reducers),
    getState => [ promiseMiddleware(api, getState) ]
  );
  const redux = createRedux(dispatcher, initialState);

  return redux;
}
