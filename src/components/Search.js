import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      u_auth_0: "",
      u_id: 0,
      all_other_users: [],
      search_criteria: "",
      search_box_content: ""
    }
  }

  //Component did mount: If a user is NOT logged in, route them automatically to the "Auth" component.
  //Component did mount: load first 4 members (not including the user that is logged in)

  //Method: Logout

  //Method onChange: update this.state.search_criteria as it is altered
  //Method onChange: update this.state.search_box_content as it is typed
  //Method onClick: when "search" is clicked, sort all_other_users by the search_criteria and the search_box_content
  //Method onClick: when "Reset" is clicked, set this.state.all_other_users to the values that were originally pulled from the db when this component mounted
  //Method onClick: when "2" or "3" or "4" is clicked, load the next four "other" users


  render() {
    return (
      <div className="search_overall">

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
          
          <div className="search_elements_container">
            <select className="search_criteria_drop_down">
            </select>
            <input className="search_input_box" />
            <button className="search_button">Search</button>
            <button className="reset_search_button">Reset</button>
          </div>

          <div className="search_results_container">
            <div className="matched_search_friend_info_container">
              <img className="matched_search_friend_image" src="" alt="Matched Friend"/>
              <div>
                <p className="matched_search_friend_first_name">First Name</p>
                <p className="matched_search_friend_last_name">Last Name</p>
              </div>
            </div>
          </div>

          <div className="page_links_container">
            <div className="current_page_indicator">Page {}</div>
            <div className="additional_page_link">{}</div>
          </div>

        </section>
      </div>
    )
  }
}

export default Search;