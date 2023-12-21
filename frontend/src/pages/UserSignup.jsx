import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secondpassword, setsecondPassword] = useState("");

  const Navigate = useNavigate();
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRepeatPasswordChange = (e) => setsecondPassword(e.target.value);

  /*  function handleSignup() {
    Navigate("/");
  } */
  async function handleSignup() {
    try {
      // Check if passwords match
      if (password !== secondpassword) {
        // Handle password mismatch (e.g., show an error message to the user)
        console.error("Passwords do not match");
        return;
      }

      const response = await axios.post("http://localhost:5105/signup", {
        email: username,
        password: password,
      });

      // Redirect to the home page or login page after successful signup
      Navigate("/");
    } catch (error) {
      console.error("Signup failed:", error.message);
      // Handle signup failure (e.g., show an error message to the user)
    }
  }

  return (
    <div className="userloginpage">
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
