import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormComponent from "../components/FormComponent"
import "./UserLogin.css";
const LoginPage = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) Navigate("/");
  }, [Navigate]);
  async function handleLogin() {
    try {
      const response = await axios.post("http://localhost:5105/login", {
        email: username,
        password: password,
      });
      console.log(response.data);

      const token = response.data.token;
      localStorage.setItem("token", token);
      Navigate("/");
    } catch (error) {
      setUser({});
      console.error("Login failed:", error.message);
    }
  }

  return (
    <div className="userloginpage">
      <FormComponent username={username} password={password} handleLogin={handleLogin} handlePasswordChange={handlePasswordChange} handleUsernameChange={handleUsernameChange} type="Login" />
    </div>
  );
};

export default LoginPage;
