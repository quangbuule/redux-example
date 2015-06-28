import Immutable from 'immutable';
import ActionTypes from '../consts/ActionTypes';
import createReducer from '../lib/createReducer';

const initialState = Immutable.fromJS({});

export default createReducer(initialState, {
  [ActionTypes.init](state) {
    return Immutable.fromJS(state);
  },

  [ActionTypes.User.getOneByUsername](state, { username, res }) {
    return state.merge({
      [username]: res.body
    });
  }
});
