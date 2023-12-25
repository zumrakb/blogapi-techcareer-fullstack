import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import FormComponent from "../components/FormComponent";

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
      <FormComponent name={name} handleName={handleName} username={username} password={password} handleSignup={handleSignup} handlePasswordChange={handlePasswordChange} handleUsernameChange={handleUsernameChange} handleRepeatPasswordChange={handleRepeatPasswordChange} />
    </div>
  );
};

export default SignupPage;
