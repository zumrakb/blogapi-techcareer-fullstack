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

  async function goHome() {
    await axios.delete(`http://localhost:5105/api/blogs/${countryid}`);
    Navigate("/");
  }

  function goEditingCountry() {
    Navigate(`/blog/${countryid}/edit`);
  }

  useEffect(() => {
    async function fetchCountry() {
      const resp = await axios.get(
        `http://localhost:5105/api/blogs/${countryid}`
      );
      setData(resp.data);
    }
    fetchCountry();
  }, [countryid]);

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
