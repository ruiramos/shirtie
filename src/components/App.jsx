import React from 'react';

var Snap = require('./Snap').Snap,
    BaseComponent = require('./BaseComponent').BaseComponent,
    ImageActions = require('../actions/ImageActions'),
    imageToBase64 = require('../helpers/imageBase64');

require('../styles/app.less');

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

    ImageActions.postImage(file, (err, res) => console.log(res));

    // imageToBase64(file, function(data){
    //   that.refs.imageContainer.getDOMNode().src = data;
    //   ImageActions.postImage(data, function(error, response){
    //     if (response.status === 200 && response.body.status_code === 'OK') {
    //       console.log('got response', response.body.results[0].result.tag);
    //     }
    //   });
    // });
  }

  snapPhoto(){
    this.refs.snap.triggerButton();
  }
                  // <svg x="0px" y="0px" viewBox="0 1.8 24 20.3" className="logo left">
                  //   <g>
                  //     <path fill="#FFFFFF" d="M12,10.3c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2s2-0.9,2-2C14,11.2,13.1,10.3,12,10.3z M12,13.5 c-0.7,0-1.2-0.5-1.2-1.2s0.5-1.2,1.2-1.2c0.7,0,1.2,0.5,1.2,1.2S12.7,13.5,12,13.5z"/>
                  //     <path fill="#FFFFFF" d="M23.5,8.5l-6.4-6.3h-1.8c0,1-1.5,2.1-3.3,2.1S8.7,3.2,8.7,2.2H6.9L0.5,8.5c-0.4,0.4-0.4,1.1,0,1.5l3.1,3 c0.4,0.4,1.2,0.4,1.6,0L7,11.9v8.5C7,21,7,21.8,7.6,21.8H16h0.4c0.6,0,0.6-0.8,0.6-1.4v-8.5l1.6,1.1c0.4,0.4,1.3,0.4,1.8,0l3.1-3 C23.9,9.6,23.9,8.9,23.5,8.5z M16,14.6c0,0.4-0.3,1.3-0.8,1.3H8.8c-0.4,0-0.8-0.8-0.8-1.3V9.9c0-0.4,0.3-0.8,0.8-0.8H9h1l0.8-1h2.4 l0.8,1h1.2c0.4,0,0.8,0.4,0.8,0.8V14.6z"/> 
                  //   </g>
                  // </svg>
  render() {
    return (
      <body className="app">
        <header className="page-header">
          <nav className="top-nav">
            <div className="container">
              <div className="nav-wrapper">
                <a href="#" className="brand-logo page-title">

                  <h1>Shirtie</h1>
                </a>
              </div>
            </div>
          </nav>
        </header>
        
        <main className="container valign-wrapper">
          <div className="row valign center-align main-row">
            <div className="col s12 m10 offset-m1 l10 offset-l1">
              <h5>Snap a pic to make a Shirtie!</h5>
              <button onClick={this.snapPhoto} className="btn-floating btn-large waves-effect waves-light"><i className="large material-icons">photo_camera</i></button>
              <div className="card-panel center-align hide">
                <Snap ref="snap" handlePhotoChanged={this.handlePhotoChanged} />
                <img ref="imageContainer" />
              </div>
            </div>
          </div>
        </main>

        <footer className="page-footer">
          <div className="container">
            <div className="row">
              <div className="col l12 s12">
                <h5 className="white-text">Footer Content</h5>
                <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            © 2014 Copyright Text
            <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
            </div>
          </div>
        </footer>
      </body>
    );
  }
}
