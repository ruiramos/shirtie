import React from 'react';

export class Preview extends React.Component {
  render() {
    var styles = {
      link: {
        cursor: 'pointer'
      }
    };

    return (
      <div>
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

              <button onCLick={this.sendForm} type="button">I'm ready!</button>
            </form>
          </div>

          <div className="card-action activator">
            <a className="activator" style={styles.link}>Wear it!</a>
          </div>

          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">Here it is...</span>
            <div className="card-image">
              <img src="http://materializecss.com/images/sample-1.jpg"></img>
            </div>
          </div>
          <div className="hide">
          </div>
        </div>
      </div>
    );
  }
}

/**
          // <div className="card-content left-align">
          //   <blockquote>
          //     Multiparts...
          //     <br/>
          //     <i><small>- Rui Ramos</small></i>
          //   </blockquote>
          //   <p>I am a very simple card. I am good at containing small bits of information.
          //   I am convenient because I require little markup to use effectively.</p>
          // </div>
**/
