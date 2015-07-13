import React from 'react';
import { connect } from 'react-redux';
import { prepareRoute } from '../decorators';
import * as RepoActionCreators from '../actions/repo';
import * as UserActionCreators from '../actions/user';
import RepoList from './RepoList';

@prepareRoute(async function ({ store, params: { username } }) {
  return await * [
    store.dispatch(RepoActionCreators.getByUsername(username)),
    store.dispatch(UserActionCreators.getOneByUsername(username))
  ];
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
