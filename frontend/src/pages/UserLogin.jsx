import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  /*  function handleLogin() {
    Navigate("/");
  } */
  async function handleLogin() {
    try {
      const response = await axios.post("http://localhost:5105/login", {
        email: username,
        password: password,
      });

      // Assuming the backend sends a token upon successful login
      const token = response.data.token;

      // Store the token securely (e.g., in local storage)
      localStorage.setItem("token", token);

      // Redirect to the home page
      Navigate("/");
    } catch (error) {
      console.error("Login failed:", error.message);
      // Handle login failure (e.g., show an error message to the user)
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
