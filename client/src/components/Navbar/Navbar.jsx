import React from "react";
import "./Navbar.css";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const Navbar = (props) => {
  return <div className="navbar">
    <h1>COVID19 Diary</h1>
    <div>
      <ul>
        <li><Link to={`/profile/${props.user.id}`}>Profile</Link></li>
        <li>Home</li>
        <li>Get certificate</li>
      </ul>
    </div>
  </div>
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.user.isAuth,
    user: state.user,
  };
};

export default connect(mapStateToProps, {})(Navbar);
