import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      u_auth_0: "",
      u_pic_url: "",
      u_first_name: "",
      u_last_name: "",
      recommended_friends: [],
      sorting_criteria: ""
    }
  }

  //Component did mount: If a user is NOT logged in, route them automatically to the "Auth" component.
  //Component did mount: load current user info

  //Method: Logout

  //Method: Load everyone who is not currently the user's friend

  //Method: Update the sorting criteria as soon as it is changed

  //Method: Sort everyone who is not currently the user's friend by the sorting criteria provided

  componentDidMount() {
    axios.get('api/userinfo').then(res => {
      console.log('userInfo', res.data)
      this.setState({
        u_auth_0: "",
        u_pic_url: "",
        u_first_name: null,
        u_last_name: null,
        recommended_friends: [],
        sorting_criteria: ""
      })
    })
  }

  render() {
    return (
      <div className="dashboard_overall">

        <header className="app_header">
          <div className="header_helo_home_search_container">
            <h1 className="header_helo_title">Helo</h1>
            <img className="header_home_icon" src="" alt="Home/Dashboard"/>
            <Link to='/search'>
            <img className="header_search_icon" src="" alt="Search"/>
            </Link>
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

          <div className="dashboard_user_info_and_welcome_text_container">
            <div className="dashboard_user_info_container">
              <img className="dashboard_user_info_img" src="" alt="Dashboard User"/>
              <div className="dashboard_user_name_and_edit_button_container">
                {this.state.u_first_name ? <p className="dashboard_user_first_name">{this.state.u_first_name}</p> : <p>First Name</p>}
                {this.state.u_last_name ? <p className="dashboard_user_last_name">{this.state.u_last_name}</p> : <p>Last Name</p>}
                <Link to='/profile'>
                <button className="dashboard_user_info_edit_button">Edit Profile</button>
                </Link>
              </div>
            </div>
            <div className="dashboard_welcome_container">
              <p className="dashboard_welcome_text">Welcome to Helo! Find recommended friends based on your similarities, and even search for them by name. The more you update your profile, the better recommendations we can make!</p>
            </div>
          </div>

          <div className="dashboard_recommended_friends_container">
            <div className="recommended_friends_header">
              <p className="recommended_friends_header_title">Recommended Friends</p>
              <div className="recommended_friends_header_sorting_container">
                <p className="recommended_friends_header_sorting_title">Sorted by</p>
                <select className="recommended_friends_header_sorting_selector"></select>
              </div>
            </div>

            <p className="no_recommended_friends_text">No recommendations</p>

            <div className="actual_recommended_friends_container">

              <div className="recommended_friend_info_container">
                <img className="recommended_friend_image" src="" alt="Recommended Friend"/>
                <div>
                  <p className="recommended_friend_first_name">First Name</p>
                  <p className="recommended_friend_last_name">Last Name</p>
                </div>
                <button className="add_recommended_friend_button">Add Friend</button>
              </div>

            </div>

          </div>

        </section>

      </div>
    )
  }
}

export default Dashboard;