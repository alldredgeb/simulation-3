import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addInfo } from './../ducks/reducer';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      u_pic_url: "",
      u_first_name: "",
      u_last_name: "",
      u_gender: "",
      u_hair_color: "",
      u_eye_color: "",
      u_hobby: "",
      u_birth_day: 0,
      u_birth_month: 0,
      u_birth_year: 0
    }
  }

  //Component did mount: If a user is NOT logged in, route them automatically to the "Auth" component.
  //Component did mount: load current user info

  //Method: Logout

  //Method onChange: update this.state.u_first_name as it is altered
  //Method onChange: update this.state.u_last_name as it is altered
  //Method onChange: update this.state.u_gender as it is altered
  //Method onChange: update this.state.u_hair_color as it is altered
  //Method onChange: update this.state.u_eye_color as it is altered
  //Method onChange: update this.state.u_hobby as it is altered
  //Method onChange: update this.state.u_birth_day as it is altered
  //Method onChange: update this.state.u_birth_month as it is altered
  //Method onChange: update this.state.u_birth_year as it is altered

  //Method onClick: When the "cancel" button is clicked, set state to the values that were originally pulled from the db when this component mounted

  //Method onClick: When the "Update" button is clicked, update state and update the db with the newly entered information.

  render() {
    
    let { addInfo, u_pic_url, u_first_name, u_last_name, u_gender, u_hair_color, u_eye_color, u_hobby, u_birth_day, u_birth_month, u_birth_year } = this.props;

    return (
      <div className="profile_overall">

        <header className="app_header">
          <div className="header_helo_home_search_container">
            <h1 className="header_helo_title">Helo</h1>
            <Link to='/dashboard'><img className="header_home_icon" src="" alt="Home/Dashboard"/></Link>
            <Link to='/search'><img className="header_search_icon" src="" alt="Search"/></Link>
          </div>
          <div className="header_view_title_container">
            <p className="header_view_title">Dashboard</p>
          </div>
          <Link to='/'>
          <div className="header_logout_container">
            <p className="header_logout">Logout</p>
          </div>
          </Link>
        </header>



        <section className="app_display_area">

          <div className="profile_user_info_and_update_cancel_buttons_container">
            <div className="profile_user_info_container">
              <img className="profile_user_info_image" src="" alt="Profile User"/>
              <div className="profile_user_info_name_container">
                <p className="profile_user_info_first_name"></p>
                <p className="profile_user_info_last_name"></p>
              </div>
            </div>
            <div className="profile_user_info_update_and_cancel_buttons_container">
            <button className="profile_user_info_update_button">Update</button>
            <button className="profile_user_info_cancel_button">Cancel</button>
            </div>
          </div>

          <div className="edit_user_info_container">
            <div className="edit_user_info_first_column">
              <p className="edit_user_first_name">First Name</p>
              <input />
              <p className="edit_user_last_name">Last Name</p>
              <input />
              <p className="edit_user_gender">Gender</p>
              <select></select>
              <p className="edit_user_hair_color">Hair Color</p>
              <select></select>
              <p className="edit_user_eye_color">Eye Color</p>
              <select></select>
            </div>
            <div className="edit_user_info_second_column">
            <p className="edit_user_hobby">Hobby</p>
              <select></select>
              <p className="edit_user_birthday_day">Birthday Day</p>
              <select></select>
              <p className="edit_user_birthday_month">Birthday Month</p>
              <select></select>
              <p className="edit_user_birthday_year">Birthday Year</p>
              <select></select>
            </div>
          </div>

        </section>

      </div>
    )
  }
}

function moveFromStoreToProps(state) {
  return {
    u_pic_url: state.u_pic_url,
    u_first_name: state.u_first_name,
    u_last_name: state.u_last_name,
    u_gender: state.u_gender,
    u_hair_color: state.u_hair_color,
    u_eye_color: state.u_eye_color,
    u_hobby: state.u_hobby,
    u_birth_day: state.u_birth_day,
    u_birth_month: state.u_birth_month,
    u_birth_year: state.u_birth_year
  }
}

var outputActions = {
  addInfo
}

let connectedApp = connect(moveFromStoreToProps, outputActions);

export default connectedApp(Profile);