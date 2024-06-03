// import useParams from react-router-dom
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";

const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const jwt = useSelector((state) => state.auth.jwt);
  // Get product from server by id
  useEffect(() => {
    axiosInstance
      .get(`/api/product/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        console.log("Response: ", res);
        setProduct(res.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
        if (error.response.data.message === "Invalid Token") {
          console.log("Invalid Token");
          navigate("/signin");
        }
      });
  }, []);

  const onAddToCart = () => {
    //POST /api/cart/add?productId=2&quantity=2
    console.log("Add to cart");
    axiosInstance
      .post(
        `/api/cart/add?productId=${product.id}&quantity=${quantity}`,
        {},
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )
      .then((res) => {
        console.log("Response: ", res);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  // const product = {
  //   id: 1,
  //   name: "Naruto Figure 1",
  //   description: "Test",
  //   price: 110,
  //   category: null,
  //   imageUrl:
  //     "https://img2.cgtrader.com/items/2895079/2f05452561/large/naruto-uzumaki-3d-model-stl.jpg",
  //   creationDate: "2024-06-02T20:11:08.000+00:00",
  // };
  return (
    <div className="h-screen">
      <div className="rounded-box bg-base-200 px-8 mx-36 py-8 my-5">
        <h1 className="font-bold text-2xl text-center mb-6">Product Detail</h1>
        <div className="flex">
          <div className="w-1/2">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full rounded-box"
            />
          </div>
          <div className="w-1/2 px-4">
            <h2 className="text-xl font-bold">Product Name: {product.name}</h2>
            <p>Description</p>
            <p className="text-gray-500">{product.description}</p>
            <p className="text-lg font-bold mt-4">Price: ${product.price}</p>
            <div className="flex flex-col mt-4">
              <label htmlFor="quantity" className="block text-lg font-bold">
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                placeholder="Quantity"
                className="input input-bordered w-full max-w-xs block"
                min={1}
                value={quantity}
                onChange={(e) => {
                  e.target.value < 1
                    ? setQuantity(1)
                    : setQuantity(e.target.value);
                }}
              />
              <button
                className=" bg-accent text-white py-2 rounded-md mt-3 w-2/5"
                onClick={onAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
