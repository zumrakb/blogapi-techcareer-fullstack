import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secondpassword, setsecondPassword] = useState("");

  const Navigate = useNavigate();
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRepeatPasswordChange = (e) => setsecondPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) Navigate("/");
  }, [Navigate]);
  async function handleSignup() {
    try {
      if (password !== secondpassword) {
        console.error("Passwords do not match");
        return;
      }

      await axios.post("http://localhost:5105/signup", {
        email: username,
        password: password,
        name: name,
      });

      Navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  }

  return (
    <div className="userloginpage">
      <div className="labelinput">
        <label>Full Name</label>
        <input
          className="userinput"
          type="text"
          value={name}
          onChange={handleName}
        />
      </div>
      <div className="labelinput">
        <label>Username/Email:</label>
        <input
          className="userinput"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="labelinput">
        <label>Password:</label>
        <input
          className="userinput"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <label>Confirm Password:</label>
        <input
          className="userinput"
          type="password"
          value={secondpassword}
          onChange={handleRepeatPasswordChange}
        />
      </div>

      <button type="button" onClick={handleSignup}>
        Sign Up
      </button>
      <Link to={"/login"} className="account">
        Already have an account?
      </Link>
    </div>
  );
};

export default SignupPage;
