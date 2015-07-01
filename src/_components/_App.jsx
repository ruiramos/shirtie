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

    return (
      <div className="app">
        <Header />
        <Content view={ this.state.contentView } />
        <Footer />
      </div>
    );
  }
}
