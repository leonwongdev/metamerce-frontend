import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosConfig";
import { Link } from "react-router-dom";
import { div } from "three/examples/jsm/nodes/Nodes.js";

const ManageProduct = () => {
  // State
  const [products, setProducts] = useState([]);

  // Hook

  useEffect(() => {
    // Get all products
    // Fetch products from the server
    axiosInstance
      .get("/api/product", {})
      .then((res) => {
        console.log("Products Response: ", res);
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Products Response Error: ", error);
      });
  }, []);

  const renderProductsTable = () => {
    return (
      <div className="bg-base-200 p-10 m-10 rounded-box">
        <h1 className="text-3xl text-center">Product List</h1>
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>
                  <Link
                    to={`/admin/products/edit/${product.id}`}
                    className="btn btn-sm btn-primary"
                  >
                    Edit
                  </Link>
                  {/* <button className="btn btn-sm btn-error">Delete</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return <div>{renderProductsTable()}</div>;
};

export default ManageProduct;
