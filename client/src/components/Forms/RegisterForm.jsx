import React, { useState } from "react";

const RegisterForm = ({register}) => {
  const [fields, setFields] = useState({
    login: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    register(fields.login, fields.email, fields.password)
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
          Email:
          <input type="text" name="email" onChange={handleChange}/>
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

export default RegisterForm;
