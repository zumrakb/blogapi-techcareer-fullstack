import React from "react";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./EditingCountry.css";
import AvatarOne from "../assets/avatarOne.png"
import { getCountryBanner } from "../Flags";
const EditingCountry = () => {
  const Navigate = useNavigate();
  const { countryid } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setimageLink] = useState("");
  const isLogin = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  async function editingSubmit() {
    try {
      const newbody = {
        title: title,
        description: description,
        imageLink: imageLink,
      };

      const token = localStorage.getItem("token");

      await axios.put(`http://localhost:5105/api/blogs/${countryid}`, newbody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Navigate(`/blog/${countryid}`);
    } catch (error) {
      console.error("Blog update failed:", error.message);
    }
  }
  function handleInput(e) {
    setTitle(e.target.value);
  }
  function handleTextarea(e) {
    setDescription(e.target.value);
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
        const countryinfo = resp.data;
        setTitle(countryinfo.title);
        setDescription(countryinfo.description);
        setimageLink(countryinfo.imageLink);
        setLoading(false);
      }
      fetchCountry();
    } else Navigate("/login");
  }, [countryid, isLogin, Navigate]);

  return (
    <div className="editingPage">
      {!loading && <div className="banner">
        <img className="banner-image" src={getCountryBanner(imageLink)} alt=""></img>
        <div className="createdBy">
          <div className="left">
            <div className="left-container">
              <input
                className="creationInput selectedCountryName"
                type="text"
                placeholder="Edit the country name."
                onChange={handleInput}
                value={title}
              /> 
              <hr />
            </div>

            <img
              className="selectedCountryFlag"
              src={imageLink}
              alt="flagofcountry"
            />
          </div>
          <div className="right">
            <img className="avatar" src={AvatarOne} alt="" />
            <span>Zumra Kucubezirci</span>
          </div>

        </div>
      </div>}
      {/*  <img className="countryFlag" src={imageLink} alt="flagofcountry" />
      <h1 className="editingPageTitle">EDIT THE INFORMATION</h1> */}
      {/*  <div className="creationForm"> */}
      {/*  <input
          className="creationInput"
          type="text"
          placeholder="Edit the country name."
          onChange={handleInput}
          value={title}
        /> */}
      <div className="main-content">
        <textarea
          placeholder="Edit the description."
          className="editingTextarea"
          name="textarea"
          id="textArea"
          cols="30"
          rows="10"
          onChange={handleTextarea}
          value={description}
        ></textarea>
        <div className="right-content">
          <button onClick={editingSubmit} className="editingSubmit">
            Save
          </button>
        </div>
        
      </div>
      
      {/* </div> */}
    </div>
  );
};

export default EditingCountry;
