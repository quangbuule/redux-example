import React from 'react';
import { connect } from 'redux/react';
import { prepareRoute } from '../decorators';
import { isUserLoaded } from '../reducers/User';
import { isRepoLoadedForUser } from '../reducers/Repo';
import * as RepoActionCreators from '../actions/repo';
import * as UserActionCreators from '../actions/user';
import RepoList from './RepoList';

@prepareRoute(async function ({ redux, params: { username } }) {
  const currentState = redux.getState();
  let promises = [];
  if(!isUserLoaded(currentState, username)) {
    promises.push(redux.dispatch(UserActionCreators.getOneByUsername(username)));
  }
  if(!isRepoLoadedForUser(currentState, username)) {
    promises.push(redux.dispatch(RepoActionCreators.getByUsername(username)));
  }
  return await * promises;
})
@connect(({ Repo, User }) => ({ Repo, User }))
class UserPage extends React.Component {

  render () {
    const {
      props: {
        Repo,
        User,
        params: { username }
      }
    } = this;

    const user = User.get(username);
    const repos = Repo.get(`users/${username}`);

    return (
      <div>
        <h3>{user ? user.get('name') : 'Loading...'}</h3>
        <div>{user ? user.get('location') : 'Loading...'}</div>
        <div>{user ? user.get('bio') : 'Loading...'}</div>
        <h4>Repositories:</h4>
        {repos ? <RepoList {...{ repos }} /> : 'Loading...'}
        <p>
          <button onClick={::this.getMore}>Load more</button>
        </p>
      </div>
    );
  }

  getMore() {
    const {
      props: {
        dispatch,
        params: { username }
      }
    } = this;

    dispatch(RepoActionCreators.getMore(username));
  }
}

export default UserPage;
