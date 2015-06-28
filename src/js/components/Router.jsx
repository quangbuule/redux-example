'use strict';

import React from 'react';
import { Router } from 'react-router';
import routes from '../routes';

class AppRouter extends React.Component {

  static propTypes = {
    history: React.PropTypes.object.isRequired
  }

  render() {

    return (
      <Router {...this.props}>
        {routes}
      </Router>
    );
  }
}

export default AppRouter;
