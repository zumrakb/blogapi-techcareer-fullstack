import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { flags } from "../Flags";
import axios from "axios";

const Creation = () => {
  const Navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setimageLink] = useState("");

  function handleInput(e) {
    setTitle(e.target.value);
  }
  function handleTextarea(e) {
    setDescription(e.target.value);
  }
  function handleImg(link) {
    setimageLink(link);
  }

  async function creationSubmit() {
    const body = {
      title: title,
      description: description,
      imageLink: imageLink,
    };
    const resp = await axios.post("http://localhost:5105/api/blogs", body);

    Navigate("/");
  }

  return (
    <div className="creationPage">
      <div className="flagList">
        {flags.map((flag, id) => (
          <img
            key={id}
            style={{
              border: imageLink === flag.link ? "1px solid blue" : "none",
            }}
            onClick={() => {
              handleImg(flag.link);
            }}
            className="flagSvg"
            src={flag.link}
            alt={flag.name}
          />
        ))}
      </div>
      <div className="creationForm">
        <input
          className="creationInput"
          type="text"
          placeholder="Enter the country name."
          onChange={handleInput}
        />
        <textarea
          className="creationTextarea"
          name="textarea"
          id="textArea"
          cols="30"
          rows="10"
          placeholder="Tell us about this country."
          onChange={handleTextarea}
        ></textarea>
        <button onClick={creationSubmit} className="creationSubmit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Creation;
