import React from "react";
import { useNavigate } from "react-router-dom";
import { flags } from "../Flags";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const EditingCountry = () => {
  const Navigate = useNavigate();
  const { countryid } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setimageLink] = useState("");

  async function editingSubmit() {
    const newbody = {
      title: title,
      description: description,
      imageLink: imageLink,
    };
    const resp = await axios.put(
      `http://localhost:5105/api/blogs/${countryid}`,
      newbody
    );
    Navigate(`/blog/${countryid}`);
  }

  function handleInput(e) {
    setTitle(e.target.value);
  }
  function handleTextarea(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    fetchCountry();
  }, []);

  async function fetchCountry() {
    const resp = await axios.get(
      `http://localhost:5105/api/blogs/${countryid}`
    );
    const countryinfo = resp.data;
    setTitle(countryinfo.title);
    setDescription(countryinfo.description);
    setimageLink(countryinfo.imageLink);
  }
  return (
    <div className="editingPage">
      <img className="countryFlag" src={imageLink} alt="flagofcountry" />
      <h1 className="editingPageTitle">EDIT THE INFORMATION</h1>
      <div className="creationForm">
        <input
          className="creationInput"
          type="text"
          placeholder="Edit the country name."
          onChange={handleInput}
          value={title}
        />
        <textarea
          placeholder="Edit the description."
          className="creationTextarea"
          name="textarea"
          id="textArea"
          cols="30"
          rows="10"
          onChange={handleTextarea}
          value={description}
        ></textarea>
        <button onClick={editingSubmit} className="creationSubmit">
          Save
        </button>
      </div>
    </div>
  );
};

export default EditingCountry;
