import React from 'react';

class Application extends React.Component {

  render() {
    const { props: { children } } = this;

    return (
      <div className="Application">
        {children}
      </div>
    );
  }
}

export default Application;
