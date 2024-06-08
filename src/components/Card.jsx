import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Card = (props) => {
  // generate props validation
  Card.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  };

  return (
    <div className="card col-span-full max-w-96 bg-base-200">
      <figure>
        <img src={props.imageUrl} alt="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <p>{props.description}</p>
        <div className="card-actions justify-end">
          <Link to={`/product/${props.id}`} className="btn btn-primary">
            Check out the Product!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
