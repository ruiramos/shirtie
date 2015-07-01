import React from 'react';

export class Content extends React.Component {
  render() {
    return (
      <main>
        <p>content is:</p>
        {this.props.view}
      </main>
    );
  }
}
