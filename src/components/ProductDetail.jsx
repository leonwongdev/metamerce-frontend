// import useParams from react-router-dom
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Hook
  let { id } = useParams();
  const navigate = useNavigate();

  // Redux
  const jwt = useSelector((state) => state.auth.jwt);

  // Get product from server by id
  useEffect(() => {
    axiosInstance
      .get(`/api/product/${id}`, {
        headers: {
          // Authorization: `Bearer ${jwt}`,
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
    // Check if user is authenticated first, if not redirect to signin
    if (!jwt) {
      navigate("/signin");
      return;
    }

    //POST /api/cart/add?productId=2&quantity=2
    console.log("Add to cart");
    setIsAddingToCart(true);
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
        setModalMessage("Awesome! Product added to cart successfully!");
        document.getElementById("add-to-cart-modal").showModal();
        setIsAddingToCart(false);
      })
      .catch((error) => {
        console.error("Error: ", error);
        setModalMessage(
          "Failed to add product to cart, please contact the us!"
        );
        document.getElementById("add-to-cart-modal").showModal();
        setIsAddingToCart(false);
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

  function renderModal() {
    return (
      <>
        {/* <button
          className="btn"
          onClick={() => document.getElementById("add-to-cart-modal").showModal()}
        >
          open modal
        </button> */}
        <dialog id="add-to-cart-modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Dear Customer</h3>
            <p className="py-4">{modalMessage}</p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </>
    );
  }

  return (
    <div className="h-screen">
      {renderModal()}
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
                className=" bg-accent text-white py-2 rounded-md mt-3 w-2/5 disabled:bg-gray-600"
                onClick={onAddToCart}
                disabled={isAddingToCart ? "disabled" : ""}
              >
                {isAddingToCart ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Add To Cart"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
