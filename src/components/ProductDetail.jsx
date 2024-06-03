// import useParams from react-router-dom
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  let { id } = useParams();

  return <div>product detail page {id}</div>;
};

export default ProductDetail;
