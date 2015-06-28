import ActionTypes from '../consts/ActionTypes';
import parseLinkHeader from 'parse-link-header';

/**
 * get repositores by username
 * @return {function} action handler
 */
export function getByUsername(username) {
  /**
   * Asynchronous call API and return an action payload which will be
   * pass to reducer method as 2nd parameter.
   * @return {object}
   * type: action type
   * username: username
   * res: response from api
   *
   * See more at: ../reducers/Repo.js
   */
  return async api => ({
    type: ActionTypes.Repo.getByUsername,
    username,
    res: await api(`/users/${username}/repos`, {
      sort: 'updated',
      dierection: 'desc'
    })
  });
}

export function getMore(username) {
  return async (api, getState) => {
    const reposRes = getState().Repo.get(`users/${username}__res`);
    const nextUrl = parseLinkHeader(reposRes.header.link).next.url;

    return {
      type: ActionTypes.Repo.getMore,
      username,
      res: await api(nextUrl)
    };
  };
}
