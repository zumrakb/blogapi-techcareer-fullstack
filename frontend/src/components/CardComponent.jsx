import "../App.css";
import { useNavigate } from "react-router-dom";
import "./CardComponent.css";
import {getCountryBanner, getAvatarByID} from "../Flags";
const CardComponent = (props) => {
  const Navigate = useNavigate();

  function goToBlog() {
    Navigate(`/blog/${props.index}`);
  }

  return (
    <div className="cardComponent" onClick={goToBlog}>
      <img className="background-image" src={getCountryBanner(props.imageLink)} alt="" />
      <div className="cardTop">
        <h1 className="cardTitle">{props.title}</h1>
        <img className="cardFlag" src={props.imageLink} alt="flag"></img>
      </div>

      <div className="cardBottom">
        <img src={(getAvatarByID(props.index))} alt="avatarwomen" />
        <p>{props.createdBy}</p>
      </div>
    </div>
  );
};

export default CardComponent;
