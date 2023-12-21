import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const SelectedCountry = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState({});
  const { countryid } = useParams();
  const isLogin = localStorage.getItem("token");

  async function goHome() {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5105/api/blogs/${countryid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Navigate("/");
    } catch (error) {
      console.error("Blog deletion failed:", error.message);
    }
  }

  function goEditingCountry() {
    Navigate(`/blog/${countryid}/edit`);
  }

  useEffect(() => {
    if (isLogin) {
      async function fetchCountry() {
        const token = localStorage.getItem("token");

        const resp = await axios.get(
          `http://localhost:5105/api/blogs/${countryid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(resp.data);
      }
      fetchCountry();
    } else Navigate("/login");
  }, [countryid, isLogin, Navigate]);

  return (
    <div className="selectedCountryPage">
      <img
        className="selectedCountryFlag"
        src={data.imageLink}
        alt="flagofcountry"
      />
      <h1 className="selectedCountryName">{data.title}</h1>
      <p className="selectedCountryDescription">{data.description}</p>
      <div className="selectedCountryPageButtons">
        <button onClick={goHome} className="selectedCountryButton">
          Delete
        </button>
        <button onClick={goEditingCountry} className="selectedCountryButton">
          Edit
        </button>
      </div>
    </div>
  );
};

export default SelectedCountry;
