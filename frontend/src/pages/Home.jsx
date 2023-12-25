import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import CardComponent from "../components/CardComponent";
import axios from "axios";
import "./Home.css"
const Home = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLogin, setLogin] = useState(localStorage.getItem("token"));
  useEffect(() => {
    console.log(isLogin);
    async function fetchCountries() {
      const token = localStorage.getItem("token");
      const authString = `Bearer ${token}`;
      try{
        const resp = await axios.get("http://localhost:5105/api/blogs", {
          headers: {
            Authorization: authString,
          },
        });
        console.log(resp.data);
        setData(resp.data);
  
        console.log(resp.data)
      } catch(err) {
        logout()
      }
    }
    function logout() {
      localStorage.removeItem("token");
      setLogin(false);
      Navigate("/login");
    }

    if (isLogin) fetchCountries();
    else Navigate("/login");
  }, [isLogin, Navigate]);


  function createButton() {
    Navigate("/create");
  }

  return (
    <div className="homePage">
      <div className="creationTitle">
        <h2 className="creationTitleh2">Explore Your Country</h2>
        <hr className="hr" />
      </div>
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
          <span>Create blog</span>+
        </button>
        {/* <button className="homePageButton" onClick={logout}>
          Logout
        </button> */}
      </div>
    </div>
  );
};

export default Home;
