import React from 'react';

export class Preview extends React.Component {
  componentDidMount() {
    $(document).ready(function() {
      console.log('asjdlaskdjaklsdj');
      $('select').material_select();
    });
  }

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
            <span className="card-title activator grey-text text-darken-4">Almost there... <i className="material-icons right red-text">photo</i></span>
            <p>Just give us your details so we know where to send it!</p>

            <form className="col s12">
              <div className="row">
                <div className="input-field col s12"></div>
                <div className="input-field col s12"></div>

                <div className="input-field col s12">
                  <input type="text" name="name" id="name" />
                  <label for="name">Your name:</label>
                </div>

                <div className="input-field col s12">
                  <input type="text" name="email" id="email" />
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
                  <input type="text" name="postcode" id="postcode" />
                  <label for="postcode">Post Code:</label>
                </div>

              </div>
              <div className="row">

                <div className="input-field col s12">
                  <select name="type" id="type">
                    <option value="" disabled selected>Type</option>
                    <option value="s">T-Shirt (£9.99)</option>
                    <option value="m">Hoodie (£12.99)</option>
                  </select>
                  <label>Type:</label>
                </div>

                <div className="input-field col s12">
                  <select name="size" id="size">
                    <option value="" disabled selected>Size</option>
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                    <option value="xl">XL</option>
                  </select>
                  <label>Size:</label>
                </div>
              </div>
            </form>
          </div>

          <div className="card-action">
            <a onCLick={this.sendForm} style={styles.link}>Wear it!</a>
          </div>

          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">Your finest moment. <i className="material-icons right">close</i></span>
            <br/>
            <div className="card-image">
              <img src="http://materializecss.com/images/sample-1.jpg" className="z-depth-1"></img>
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
