import { useState, useEffect } from "react";

import axiosInstance from "../../api/axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
import useAdminCheck from "../../custom-hook/useAdminCheck";
import { useSelector } from "react-redux";
import LoadingButton from "../LoadingButton.jsx";

const EditProduct = () => {
  // Your code here
  useAdminCheck();

  // State
  const [product, setProduct] = useState({});

  // Hook
  // Get jwt from redux
  const jwt = useSelector((state) => state.auth.jwt);

  // Get the product ID from the URL
  const { productId } = useParams();
  const navigate = useNavigate();

  // State for form
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch the product from the server using the product ID
    axiosInstance
      .get(`/api/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        console.log("Product Response: ", res);
        setProduct(res.data);
        setName(res.data.name);
        setPrice(res.data.price);
        setDescription(res.data.description);
      })
      .catch((error) => {
        console.error("Product Response Error: ", error);
      });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Check if form fields are empty
    if (!name || !price || !description) {
      // Alert user
      alert("Please fill in all the form fields");
      return;
    }

    // Update the product on the server

    // Use a new product object with the updated values, update only the form field
    const updatedProduct = {
      ...product,
      name: name,
      price: price,
      description: description,
    };


    // Send put request to update the product
    setIsLoading(true);
    axiosInstance
      .put(`/api/product/${productId}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        console.log("Update Product Response: ", res);
        setIsLoading(false);
        // Redirect to the product manage page
        navigate("/admin/products");
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Update Product Response Error: ", error);
      });
  };

  const renderEditForm = () => {
    return (
      <>
        <form
          onSubmit={handleFormSubmit}
          className="bg-base-200 p-10 m-10 rounded-box"
        >
          <h1 className="text-3xl">Update Product</h1>
          <div className="mb-4">
            <label className="label">Name</label>
            <input
              type="text"
              className="input input-bordered"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
            />
          </div>
          <div className="mb-4">
            <label className="label">Price</label>
            <input
              type="number"
              className="input input-bordered"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Product Price"
            />
          </div>
          <div className="mb-4">
            <label className="label">Description</label>
            <textarea
              className="textarea textarea-bordered"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product Description"
              cols={100}
            ></textarea>
          </div>
          {/*<button type="submit" className="btn btn-primary">*/}
          {/*  Update Product*/}
          {/*</button>*/}
          <LoadingButton label={"Confirm Update"} styleClasses={"btn-primary"} type={"submit"} isLoading={isLoading}/>
        </form>
      </>
    );
  };

  return <div>{renderEditForm()}</div>;
};

export default EditProduct;
