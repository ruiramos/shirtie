import React from 'react';

var Snap = require('./Snap').Snap,
    BaseComponent = require('./BaseComponent').BaseComponent,
    Preview = require('./Preview').Preview,
    Confirmation = require('./Confirmation').Confirmation,
    ImageActions = require('../actions/ImageActions'),
    cx = require('classnames');


require('../styles/app.less');

export class App extends BaseComponent {
  constructor(){
    super();
    this.state = {};
    this.bindMethods('snapPhoto', 'handlePhotoChanged', 'handleOrderComplete', 'setLoading');
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


      if (err) {
        return this.setState({
          loading: false,
          error:err
        });
      }


      this.setState({
        loading: false,
        image: res.imageName,
        imagePath: res.imagePath,
        error: res.error
      });
    });
  }

  snapPhoto(){
    this.refs.snap.triggerButton();
  }

  handleOrderComplete(res){
    console.log('order complete', res);
    this.setState({orderId: res.order_id});
  }

  setLoading(loading){
    this.setState({loading: loading});
  }

  render() {
    var snapClass = 'snap ' + (this.state.imagePath ? 'hidden' : 'visible');
    var previewClass = 'preview ' + (this.state.imagePath && !this.state.print_order_id ? 'visible' : 'hidden');
    var confirmationClass = 'confirmation ' + (this.state.orderId ? 'visible' : 'hidden');
    var spinnerClass = this.state.loading ? '' : 'hide';
    var buttonClass  = this.state.loading ? 'faded' : '';
    var errorClass   = this.state.error ? '' : 'hide';
    var titleErrorClass = this.state.error ? 'hide' : '';

    return (
      <body className="app">
        <header className="page-header">
          <nav className="top-nav">
            <div className="container">
              <div className="nav-wrapper">
                <a href="/" className="brand-logo page-title">
                  <img src="/src/images/logo.png" className="logo left"/>
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
                <div>
                  <h5 className={titleErrorClass}>Snap a pic to create your Shirtie!</h5>
                  <h5 className={errorClass}>No inspiration was found... Try again!</h5>
                </div>
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
              previewImageName={this.state.image}
              classes={previewClass}
              handleOrderComplete={this.handleOrderComplete}
              orderId={this.state.orderId}
              setLoading={this.setLoading}
            />

            </div>
          </div>
        </main>

        <footer className="page-footer">
          <div className="container hide-on-small-only">
            <div className="row">
              <div className="col l12 s12">
                <h5 className="white-text">Shirtie</h5>
                <p className="grey-text text-lighten-4">Wear great memories.</p>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            © 2015 Shirtie.co
            <a className="grey-text text-lighten-4 right" href="http://hackthevisual.com" target="_blank">Born at #HackTheVisual</a>
            </div>
          </div>
        </footer>
      </body>
    );
  }
}
