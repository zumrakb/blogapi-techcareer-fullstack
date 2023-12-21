import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
const LoginPage = () => {
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
      console.error("Login failed:", error.message);
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
      </div>

      <button type="button" onClick={handleLogin}>
        Login
      </button>
      <Link to={"/signup"} className="account">
        Don't you have an account?
      </Link>
    </div>
  );
};

export default LoginPage;
