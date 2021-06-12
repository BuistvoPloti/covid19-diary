import React from "react";
import { connect } from "react-redux";
import { login, logout } from "../../redux/Users/user.reducer";
import { authAPI } from "../../api/api";
import LoginForm from "../Forms/LoginForm";
import RegisterForm from "../Forms/RegisterForm";

function Auth(props) {
  return (
    <div>
      logout
      <button onClick={() => props.logout()}> sign out</button>
      login
      <LoginForm login={props.login}/>
      register
      <RegisterForm register={authAPI.register}/>
    </div>
  );
}

export default connect(null, { login, logout })(Auth);
