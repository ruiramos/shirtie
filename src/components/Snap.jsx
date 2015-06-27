import React from 'react';

var BaseComponent = require('./BaseComponent').BaseComponent;


export class Snap extends BaseComponent {

  triggerButton(){
    this.refs.fileInput.getDOMNode().click();
  }

  render() {
    var styles = {
      div: {
        opacity: '0',
        visibility: 'hidden'
      },
      inputStyle: {
      }
    };

    return (
      <div style={styles.div}>
        <input
          style={styles.inputStyle}
          type="file"
          ref="fileInput"
          id="take-picture"
          accept="image/*"
          onChange={this.props.handlePhotoChanged}
        />
      </div>
    );
  }
}
