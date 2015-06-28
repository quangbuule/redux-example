import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import RepoListItem from './RepoListItem';

class RepoList extends React.Component {

  static propTypes = {
    repos: PropTypes.instanceOf(Immutable.List).isRequired
  }

  render() {
    const {
      props: { repos }
    } = this;

    return (
      <ol>
        {repos.map(repo => <RepoListItem key={repo.get('id')} {...{ repo }} />)}
      </ol>
    );
  }
}

export default RepoList;
