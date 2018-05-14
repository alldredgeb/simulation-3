import React, { Component } from 'react';

class Auth extends Component {

  //Component did mount: If a user is logged in, route them automatically to the "Dashboard" component.

  render() {
    return (
      <div className="auth_background">

        <div className="containter_of_auth_elements">
          <img className="logo_auth_element" src="" alt="Logo"/>
          <h1 className="title_auth_element">Helo</h1>
          <a href={process.env.REACT_APP_LOGIN}>Login / Register</a>
        </div>

      </div>
    )
  }
}

export default Auth;