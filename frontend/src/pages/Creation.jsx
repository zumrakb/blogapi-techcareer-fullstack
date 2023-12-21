import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { flags } from "../Flags";
import axios from "axios";

const Creation = () => {
  const Navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setimageLink] = useState("");
  const isLogin = localStorage.getItem("token");
  useEffect(() => {
    if (!isLogin) Navigate("/login");
  }, [isLogin, Navigate]);

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
    try {
      const body = {
        title: title,
        description: description,
        imageLink: imageLink,
      };

      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5105/api/blogs", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Navigate("/");
    } catch (error) {
      console.error("Blog creation failed:", error.message);
    }
  }
  return (
    <div className="creationPage">
      <div className="flagList">
        {flags.map((flag, id) => (
          <img
            key={id}
            style={{
              border: imageLink === flag.link ? "1px solid #3498db" : "none",
              borderRadius: "8px",
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
