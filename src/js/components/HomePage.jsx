import React from 'react';
import { Link } from 'react-router';

class UserPage extends React.Component {

  render () {
    return (
      <div>
        <h3>Github</h3>
          <div>
            <Link to="/facebook">View Facebook's profile & repositories</Link>
          </div>
          <div>
            <Link to="/google">View Google's profile & repositories</Link>
          </div>
      </div>
    );
  }
}

export default UserPage;
