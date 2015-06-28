import React from 'react';

require('../styles/preview.less');

var BaseComponent = require('./BaseComponent').BaseComponent,
    Confirmation = require('./Confirmation').Confirmation,
    OrderActions = require('../actions/OrderActions');

export class Preview extends BaseComponent {
  constructor(){
    super();
    this.state = {type: 'tshirt'};

    this.bindMethods('sendFirstForm', 'handlePurchase');
  }

  componentDidMount() {
    $('select').material_select();
    var that = this;

    this.handler = StripeCheckout.configure({
      key: 'pk_test_hPQEW3iYvtdD31MedlLl2m29',
      image: '/img/documentation/checkout/marketplace.png',
      token: function(token) {
        console.log('got token', token);
        OrderActions.createOrder(that.state.form1, token, that.props.previewImageName,
          (err, res)=>{that.props.handleOrderComplete(res.body)})
      }
    });
  }

  sendFirstForm(){
    var formData = $(this.refs.theFirstForm.getDOMNode()).serializeArray();
    var v = this.refs.typeSelect.getDOMNode().value;

    console.log($(this.refs.theFirstForm.getDOMNode()), formData);
    this.setState({
      form1: formData,
      email: this.refs.emailInput.getDOMNode().value,
      type: v,
      cost: v === 'tshirt' ? 990 : 1990

    });
  }

  handlePurchase(){
    var that = this;

    // Open Checkout with further options
    this.handler.open({
      name: 'SHIRTIE!',
      description: '1 Awesome '+this.state.type+'!',
      currency: "gbp",
      email: this.state.email,
      amount: this.state.cost
    });

    // Close Checkout on page navigation
    $(window).on('popstate', function() {
      that.handler.close();
    });
  }

  render() {
    console.log(this.props.previewImage, this.props);
    var styles = {
      link: {
        cursor: 'pointer'
      },
      preview: {
        backgroundImage: 'url(' + (window.host + this.props.previewImage) + '), url(/src/images/shirt.png)'
      }
    };

    var firstFormClass = 'firstForm ' + (!this.state.form1 ? 'visible':'hidden');
    var secondFormClass = 'secondForm ' + (this.state.form1 ? 'visible':'hidden');

    var confirmationThing = 'confirmation ' + (this.props.orderId ? 'visible':'hidden');
    var formsThing = 'confirmation ' + (!this.props.orderId ? 'visible':'hidden');

    var secondFormPStyle = {'textAlign': 'center', 'margin':'50px 0 40px'};

    return (
      <div className={this.props.classes}>
        <br/>
        <br/>
        <div className="card center-align">

          <div className="card-content left-align">
            <div className={formsThing}>
              <span className="card-title activator grey-text text-darken-4">Almost there... <i className="material-icons right red-text">photo</i></span>
              <p>Just tell us where to send your Shirtie!</p>

              <form ref="theFirstForm"  className={firstFormClass + " col s12"}>
                <div className="row">
                  <div className="input-field col s12"></div>
                  <div className="input-field col s12"></div>

                  <div className="input-field col s12">
                    <input type="text" name="name" id="name" />
                    <label for="name">Your name:</label>
                  </div>

                  <div className="input-field col s12">
                    <input ref="emailInput" type="text" name="email" id="email" />
                    <label for="email">Your email:</label>
                  </div>

                </div>
                <div className="row">

                  <div className="input-field col s12">
                    <input type="text" name="address1" id="address1" />
                    <label for="address1">Address 1:</label>
                  </div>

                  <div className="input-field col s12">
                    <input type="text" name="address2" id="address2" />
                    <label for="address2">Address 2:</label>
                  </div>

                  <div className="input-field col s12">
                    <input type="text" name="city" id="city" />
                    <label for="city">City:</label>
                  </div>


                  <div className="input-field col s12">
                    <input type="text" name="postcode" id="postcode" />
                    <label for="postcode">Post Code:</label>
                  </div>

                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <select ref="typeSelect" name="type" id="type" onChange={this.handleTypeChange} value={this.state.type}>
                      <option value="" disabled>Type</option>
                      <option value="tshirt">T-Shirt (£9.90)</option>
                      <option value="hoodie">Hoodie (£19.90)</option>
                    </select>
                    <label>Type:</label>
                  </div>

                  <div className="input-field col s12">
                    <select name="size" id="size" defaultValue="l">
                      <option value="" disabled>Size</option>
                      <option value="s">S</option>
                      <option value="m">M</option>
                      <option value="l">L</option>
                      <option value="xl">XL</option>
                    </select>
                    <label>Size:</label>
                  </div>
                </div>
              </form>

            <form ref="theSecondForm" className={secondFormClass} action="/charge" method="POST">
              <p style={secondFormPStyle}>
                <button id="stripeButton" className="btn waves-effect waves-light" type="button" onClick={this.handlePurchase}>Pay securely using Stripe</button>
              </p>
            </form>
          </div>

          <div className={confirmationThing}>
            <Confirmation
              orderId={this.props.orderId}
              formData={this.state.form1}
            />
          </div>

          </div>

          <div className={firstFormClass + " card-action"}>
            <a onClick={this.sendFirstForm} style={styles.link}>Wear it!</a>
          </div>

          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">Your finest moment. <i className="material-icons right">close</i></span>
            <br/>
            <div className="card-image">
              <div className="preview-shirt" style={styles.preview}>
                <img src="/src/images/shirt.png"/>
              </div>
            </div>
          </div>
          <div className="hide">
          </div>
        </div>
      </div>
    );
  }
}
