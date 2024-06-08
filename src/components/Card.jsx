import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Card = (props) => {
  // generate props validation
  Card.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  };

  return (
    <div className="card col-span-full max-w-96 bg-base-200">
      <figure>
        <img src={props.imageUrl} alt="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-sm font-bold">{props.title}</h2>
        <p className="max-h-24 text-ellipsis overflow-hidden whitespace-nowrap text-sm">
          {props.description}
        </p>
        <p className="text-base font-semibold">Price ${props.price}</p>
        <div className="card-actions justify-end">
          <Link to={`/product/${props.id}`} className="btn btn-primary">
            Interact!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
