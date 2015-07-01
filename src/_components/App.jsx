import React from 'react';

var
    BaseComponent = require('./BaseComponent').BaseComponent,
    cx = require('classnames');

require('../styles/app.less');

export class App extends BaseComponent {
  constructor(){
    super();
    this.state = {};
  }


  render() {

    return (
      <div className="app">
        <Header />
        <Content view={ this.props.contentView } />
        <Footer />
      </div>
    );
  }
}
