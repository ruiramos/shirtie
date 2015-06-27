
var React = require('react');

export class BaseComponent extends React.Component {
  bindMethods(...methods){
    methods.forEach( (method) => this[method] = this[method].bind(this) );
  }
}