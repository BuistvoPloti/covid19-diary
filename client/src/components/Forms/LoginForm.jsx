import React, { useState } from "react";

const LoginForm = ({login}) => {
  const [fields, setFields] = useState({
    login: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(fields.login, fields.password)
    console.log('submitted')
  }

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    setFields({ ...fields, [name]: target.value });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Login:
          <input type="text" name="login" onChange={handleChange}/>
        </label>
        <label>
          Password:
          <input type="password" name="password" onChange={handleChange}/>
        </label>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default LoginForm;
