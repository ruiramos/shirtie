import React from 'react';

export class Confirmation extends React.Component {
  render() {
    return (
      <div className={this.props.classes}>all ok! your id: {this.props.orderId}</div>
    );
  }
}
