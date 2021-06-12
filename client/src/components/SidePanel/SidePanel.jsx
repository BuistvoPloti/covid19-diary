import React from "react";
import "./SidePanel.css"
import "./Following.css"
import "../Search/SearchUser.css"
import SearchUser from "../Search/SearchUser";
import Following from "./Following";
import {connect} from "react-redux";

const SidePanel = (props) => {
  return <div className="sidepanel">
    <SearchUser/>
    {props.user.isAuth ? <Following followed_users={props.user.followed_users}/> : null}
  </div>
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    isAuth: state.user.isAuth,
  };
};

export default connect(mapStateToProps, {})(SidePanel);
