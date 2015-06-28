import React from 'react';

var Snap = require('./Snap').Snap,
    BaseComponent = require('./BaseComponent').BaseComponent,
    Preview = require('./Preview').Preview,
    ImageActions = require('../actions/ImageActions'),
    cx = require('classnames');


require('../styles/app.less');

export class App extends BaseComponent {
  constructor(){
    super();
    this.state = {};
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

    this.setState({loading: true});

    ImageActions.postImage(file, (err, res) => {
      console.log('got', res);
      this.setState({
        loading: false,
        image: res.imageName,
        imagePath: res.imagePath
      })
    });
  }

  snapPhoto(){
    this.refs.snap.triggerButton();
  }

  render() {
    var snapClass = 'snap ' + (this.state.imagePath ? 'hidden' : 'visible');
    var previewClass = 'preview ' + (this.state.imagePath ? 'visible' : 'hidden');
    var spinnerClass = this.state.loading ? '' : 'hide';
    var buttonClass  = this.state.loading ? 'faded' : '';

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
              <div className={snapClass}>
                <h5>Snap a pic to make a Shirtie!</h5>
                <Snap ref="snap" className="hide" handlePhotoChanged={this.handlePhotoChanged} />
                <button onClick={this.snapPhoto} className={buttonClass+" fade btn-floating btn-large waves-effect waves-light"}><i className="large material-icons">photo_camera</i></button>
              </div>

              <div className={spinnerClass + " preloader-wrapper active"}>
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

            <Preview
              previewImage={this.state.imagePath}
              classes={previewClass}
            />

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
