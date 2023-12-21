import "../App.css";
import { useNavigate } from "react-router-dom";

const CardComponent = (props) => {
  const Navigate = useNavigate();

  function goToBlog() {
    Navigate(`/blog/${props.index}`);
  }

  return (
    <div className="cardComponent" onClick={goToBlog}>
      <img className="cardFlag" src={props.imageLink} alt="flag"></img>
      <h1 className="cardTitle">{props.title}</h1>
      <p>created by: {props.createdBy}</p>
    </div>
  );
};

export default CardComponent;
