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
              <div className="preloader-wrapper hide active">
                <div className="spinner-layer spinner-blue">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>

                <div className="spinner-layer spinner-red">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>

                <div className="spinner-layer spinner-yellow">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>

                <div className="spinner-layer spinner-green">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>
              </div>
              <div className="card center-align">
                <div className="card-image">
                  <img ref="imageContainer" />
                  <img src="http://materializecss.com/images/sample-1.jpg"></img>
                  <span className="card-title">Card Title</span>
                </div>
                <div className="card-content left-align">
                  <blockquote>
                    Multiparts...
                    <br/>
                    <i><small>- Rui Ramos</small></i>
                  </blockquote>
                  <p>I am a very simple card. I am good at containing small bits of information.
                  I am convenient because I require little markup to use effectively.</p>
                </div>
                <div className="card-action">
                  <a href="#">Wear it!</a>
                </div>
                <div className="hide">
                  <Snap ref="snap" className="hide" handlePhotoChanged={this.handlePhotoChanged} />
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="page-footer">
          <div className="container hide-on-small-only">
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
            <a className="grey-text text-lighten-4 right" href="#!">#HackTheVisual</a>
            </div>
          </div>
        </footer>
      </body>
    );
  }
}
