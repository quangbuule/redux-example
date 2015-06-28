import React, { PropTypes } from 'react';
import Immutable from 'immutable';

class RepoListItem extends React.Component {

  static propTypes = {
    repo: PropTypes.instanceOf(Immutable.Map).isRequired
  }

  render() {
    const {
      props: { repo }
    } = this;

    return (
      <li>
        <p>
          <big><strong>{repo.get('name')}</strong></big>:&nbsp;
          <small>
            ({repo.get('stargazers_count')}&nbsp;
              <span className="glyphicon glyphicon-star-empty"></span>)
          </small>
          <br />
          {repo.get('description')}
        </p>
      </li>
    );
  }
}

export default RepoListItem;
