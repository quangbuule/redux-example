import Immutable from 'immutable';
import ActionTypes from '../consts/ActionTypes';
import createReducer from '../lib/createReducer';

const initialState = Immutable.fromJS({});

export default createReducer(initialState, {
  /**
   * This will receive and initialize state from __INITIAL_STATE__.Repo
   */
  [ActionTypes.init](state) {
    return Immutable.fromJS(state);
  },

  /**
   * Because github use header for pagination, so we should receive res from
   * api call and store res to store's state also.
   *
   * See action at ../actions/repo.js
   */
  [ActionTypes.Repo.getByUsername](state, { username, res }) {
    const repos = res.body;

    return state.merge({
      [`users/${username}__res`]: res,
      [`users/${username}`]: repos
    });
  },

  /**
   * Get more repos from github
   */
  [ActionTypes.Repo.getMore](state, { username, res }) {
    const repos = state.get(`users/${username}`);
    const nextRepos = repos.concat(Immutable.fromJS(res.body));

    return state.merge({
      [`users/${username}__res`]: res,
      [`users/${username}`]: nextRepos
    });
  }
});
