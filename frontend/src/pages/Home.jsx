import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import CardComponent from "../components/CardComponent";
import axios from "axios";

const Home = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  //communication frontend backend
  useEffect(() => {
    fetchCountries();
  }, []);

  async function fetchCountries() {
    const resp = await axios.get("http://localhost:5105/api/blogs");
    setData(resp.data);
  }

  function createButton() {
    Navigate("/create");
  }
  function goToLogInPage() {
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
        <button className="homePageButton" onClick={goToLogInPage}>
          Sign Up / Log In
        </button>
      </div>
    </div>
  );
};

export default Home;
