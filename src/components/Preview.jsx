import React from 'react';

require('../styles/preview.less');

export class Preview extends React.Component {
  render() {
    var styles = {
      link: {
        cursor: 'pointer'
      }
    };

    return (
      <div className={this.props.classes}>
        <div className="card center-align">

          <div className="card-content left-align">
            <span className="card-title grey-text text-darken-4">Almost there...</span>
            <p>Just give us your details so we know where to send it!</p>

            <form>
              <label>Your name:</label>
              <input type="text" name="name" />

              <label>Your email:</label>
              <input type="text" name="email" />

              <label>Address 1:</label>
              <input type="text" name="address1" />

              <label>Address 2:</label>
              <input type="text" name="address2" />

              <label>Post Code:</label>
              <input type="text" name="postcode" />

              <label>Type:</label>
              <select name="type">
                <option value="s">T-Shirt (£9.99)</option>
                <option value="m">Hoodie (£12.99)</option>
              </select>

              <label>Size:</label>
              <select name="size">
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
              </select>

              <button onClick={this.sendForm} type="button">I'm ready!</button>
            </form>
          </div>

          <div className="card-action activator">
            <a className="activator" style={styles.link}>Wear it!</a>
          </div>

          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">Here it is...</span>
            <div className="card-image">
              <img src={'http://192.168.88.209:3000' + this.props.previewImage}></img>
            </div>
          </div>
          <div className="hide">
          </div>
        </div>
      </div>
    );
  }
}

