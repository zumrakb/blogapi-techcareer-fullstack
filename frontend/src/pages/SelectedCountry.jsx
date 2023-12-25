import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./SelectedCountry.css";

import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import editIcon from "../assets/editIcon.svg";
import deleteIcon from "../assets/deleteIcon.svg";

import { getAvatarByID, getCountryBanner } from "../Flags";
const SelectedCountry = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState({});
  const { countryid } = useParams();
  const isLogin = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      }
      fetchCountry();
    } else {
      Navigate("/login");
      setLoading(true);
    }
  }, [countryid, isLogin, Navigate]);

  return (
    <div className="selectedCountryPage">
      {!loading && (
        <div className="banner">
          <img
            className="banner-image"
            src={getCountryBanner(data?.imageLink)}
            alt=""
          ></img>
          <div className="createdBy">
            <div className="left">
              <div className="left-container">
                <h1 className="selectedCountryName">{data?.title}</h1>
                <hr />
              </div>

              <img
                className="selectedCountryFlag"
                src={data.imageLink}
                alt="flagofcountry"
              />
            </div>
            <div className="right">
              <img
                className="avatar"
                src={getAvatarByID(data.createdBy.id)}
                alt=""
              />
              <span>{data.createdBy.name}</span>
            </div>
          </div>
        </div>
      )}

      <div className="main-content">
        <p className="selectedCountryDescription">{data.description}</p>
        <div className="selectedCountryPageButtons">
          <div className="icons">
            <div className="iconBackground">
              {" "}
              <img
                className="icon"
                src={editIcon}
                onClick={goEditingCountry}
                alt=""
              />
            </div>
            <div className="iconBackground">
              {" "}
              <img className="icon" src={deleteIcon} onClick={goHome} alt="" />
            </div>
          </div>

          {/* 
        <button onClick={goHome} className="selectedCountryButton">
          Delete
        </button> */}
          {/* <button onClick={goEditingCountry} className="selectedCountryButton">
          Edit
        </button> */}
        </div>
      </div>
    </div>
  );
};

export default SelectedCountry;
