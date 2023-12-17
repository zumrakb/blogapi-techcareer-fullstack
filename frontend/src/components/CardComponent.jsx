import "../App.css";
import { useNavigate } from "react-router-dom";
import Creation from "../pages/Creation";

import { flags } from "../Flags";

const CardComponent = (props) => {
  const Navigate = useNavigate();

  function goToBlog() {
    Navigate(`/blog/${props.index}`);
  }

  return (
    <div className="cardComponent" onClick={goToBlog}>
      <img className="cardFlag" src={props.imageLink} alt="flag"></img>
      <h1 className="cardTitle">{props.title}</h1>
    </div>
  );
};

export default CardComponent;
