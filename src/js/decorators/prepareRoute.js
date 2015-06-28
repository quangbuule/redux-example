'use strict';

import React, { PropTypes } from 'react';

export default function prepareRoute(prepareFn) {

  return DecoratedComponent =>
    class PrepareRouteDecorator extends React.Component {

      static prepareRoute = prepareFn

      static contextTypes = {
        redux: PropTypes.object.isRequired
      }

      render() {
        return (
          <DecoratedComponent {...this.props} />
        );
      }

      componentDidMount() {
        const {
          context: { redux },
          props: { params, location }
        } = this;

        prepareFn({ redux, params, location });
      }
    };
}
