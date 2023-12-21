import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import CardComponent from "../components/CardComponent";
import axios from "axios";

const Home = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLogin, setLogin] = useState(localStorage.getItem("token"));
  useEffect(() => {
    console.log(isLogin);

    if (isLogin) fetchCountries();
    else Navigate("/login");
  }, [isLogin, Navigate]);

  async function fetchCountries() {
    const token = localStorage.getItem("token");
    const authString = `Bearer ${token}`;

    const resp = await axios.get("http://localhost:5105/api/blogs", {
      headers: {
        Authorization: authString,
      },
    });
    console.log(resp.data);
    setData(resp.data);
  }

  function createButton() {
    Navigate("/create");
  }
  function logout() {
    localStorage.removeItem("token");
    setLogin(false);
    Navigate("/login");
  }

  return (
    <div className="homePage">
      {data.length !== 0 ? (
        <div className="cards">
          {data.map((d) => {
            return (
              <CardComponent
                key={d.id}
                index={d.id}
                imageLink={d.imageLink}
                title={d.title}
                createdBy={d.createdBy.name}
              />
            );
          })}
        </div>
      ) : (
        <h1 className="message">Create your first blog!</h1>
      )}
      <div className="buttonshome">
        <button className="homePageButton" onClick={createButton}>
          Create Country
        </button>
        <button className="homePageButton" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
