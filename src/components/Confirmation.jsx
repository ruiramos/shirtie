import React from 'react';

export class Confirmation extends React.Component {
  constructor(){
    super()
  }

  render() {
    var styles = {
      finalP: {
        marginTop: '25px'
      }
    };

    if(this.props.formData){
      var formDetails = this.props.formData.map((field) => {
        if(field.name === 'size') field.value = field.value.toUppercase();
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
        <p>Congrats! Your order <strong>{this.props.orderId}</strong> is on its way! Thank you so much for your custom, we hope to see you soon.
        Should you have any problem with your order, please get in touch at <a href="mailt:support@shirtie.co">support@shirtie.co</a></p>.
        <br/>
        <span className="card-title activator grey-text text-darken-4">Order details:</span>
        {formDetails}

        <p style={styles.finalp}><a href="/">Make another one?</a></p>
      </div>

    );
  }
}
