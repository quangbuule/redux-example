import _ from 'lodash';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from '../reducers';

function promiseMiddleware(api, { getState }) {
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
  const createStoreWithMiddleware = applyMiddleware(promiseMiddleware.bind(null,
    api))(createStore);
  const reducer = combineReducers(reducers);

  return createStoreWithMiddleware(reducer, initialState);
}
