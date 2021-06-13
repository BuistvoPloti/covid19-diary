import React from "react";
import "./Navbar.css";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const Navbar = (props) => {
  console.log(props)
  return <div className="navbar">
    <h1>COVID19 Diary</h1>
    <div className="navbar-links">
      <div className={`navbar-link active`}>
        <Link className="link" activeStyle={{ color: 'red' }} style={{'text-decoration': 'none'}} to={`/profile/${props.user.id}`}>Profile</Link>
      </div>
      {/*<div className={`navbar-link`}>*/}
      {/*  <Link className="link" style={{'text-decoration': 'none'}} to={`/auth`}>Home</Link>*/}
      {/*</div>*/}
      <div className={`navbar-link`}>
        <Link className="link" style={{'text-decoration': 'none'}} to={`/`}>Get certificate</Link>
      </div>
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
