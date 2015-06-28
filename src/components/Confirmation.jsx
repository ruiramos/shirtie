import React from 'react';

export class Confirmation extends React.Component {
  constructor(){
    super()
  }

  render() {
    if(this.props.formData){
      var formDetails = this.props.formData.map((field) => {
        return (
          <div className="field">
            <label>{field.name}</label>
            <p>{field.value}</p>
          </div>
        );
      })
    } else {
      var formDetails = [];
    }

    return (
      <div>
        <span className="card-title activator grey-text text-darken-4">Order placed!<i className="material-icons right red-text">photo</i></span>
        <p>Your order is on its way.</p>

        <p>Here are your order details: {this.props.orderId}</p>
        {formDetails}
      </div>

    );
  }
}
