import React from 'react';

var Snap = require('./Snap').Snap,
    BaseComponent = require('./BaseComponent').BaseComponent,
    ImageActions = require('../actions/ImageActions'),
    imageToBase64 = require('../helpers/imageBase64');

export class App extends BaseComponent {
  constructor(){
    super();
    this.bindMethods('snapPhoto', 'handlePhotoChanged');
  }

  handlePhotoChanged(evt){
    var that = this;

    var files = evt.target.files,
        file,
        that = this;

    if (files && files.length > 0) {
        file = files[0];
    }

    ImageActions.postImage(file, (res) => console.log(res));

    // imageToBase64(file, function(data){
    //   that.refs.imageContainer.getDOMNode().src = data;
    //   ImageActions.postImage(data, function(response){
    //     console.log('got response', response)
    //   })
    // });
  }

  snapPhoto(){
    this.refs.snap.triggerButton();
  }

  render() {
    return (
      <div>
        <p>Welcome to this fucking App!</p>
        <button onClick={this.snapPhoto}>TAKE A PHOTO!</button>
        <Snap ref="snap" handlePhotoChanged={this.handlePhotoChanged} />
        <img ref="imageContainer" />
      </div>
    );
  }
}
