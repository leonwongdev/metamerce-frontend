import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";

function OrderDetail() {
  let { id } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const jwt = useSelector((state) => state.auth.jwt);

  useEffect(() => {
    console.log("Order ID: ", id);
    axiosInstance
      .get(`/api/order/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        console.log("Order detail Response: ", res);
        setOrder(res.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
        if (error.response.data.message === "Invalid Token") {
          console.log("Invalid Token");
          navigate("/signin");
        }
      });
  }, []);

  function renderOrderDetail() {
    if (order !== null) {
      return (
        <div id="order-detail" className="bg-base-200 p-10 m-10 rounded-box">
          <h1 className="text-2xl font-bold mb-4">Order Detail</h1>
          <p className="mb-2">
            <span className="font-bold">Order ID:</span>{" "}
            <span className="">{order.id}</span>
          </p>
          <p className="mb-2">
            <span className="font-bold">Order Status:</span>{" "}
            <span className="">{order.orderStatus}</span>
          </p>
          <p className="mb-2">
            <span className="font-bold">Created At: </span>
            <span className="">{order.createdAt}</span>
          </p>
          <p className="mb-2">
            <span className="font-bold">Customer:</span>{" "}
            <span className="">{order.customer.fullname}</span>
          </p>
          <p className="mb-2">
            <span className="font-bold">Email:</span>{" "}
            <span className="">{order.customer.email}</span>
          </p>
          <p className="mb-2">
            <span className="font-bold">Address: </span>
            <span className="">
              {order.address.street}, {order.address.city},{" "}
              {order.address.province}, {order.address.country},{" "}
              {order.address.postalCode}
            </span>
          </p>
          <p className="mb-2">
            <span className="font-bold">Total Price: </span>
            <span className="">${order.totalPrice}</span>
          </p>

          <h2 className="text-xl font-bold mt-4 mb-2">Items</h2>
          <table className="table bg-yellow-100">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th className="">Product</th>
                <th className="">Quantity</th>
                <th className="">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items &&
                order.items.map((item) => (
                  <tr key={item.id} className="">
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.product.imageUrl} alt="" />
                        </div>
                      </div>
                    </td>
                    <td className="">{item.product.name}</td>
                    <td className="">{item.quantity}</td>
                    <td className="">${item.totalPrice}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

  return <div className="h-screen">{renderOrderDetail()}</div>;
}

export default OrderDetail;

// Endpoint: GET /api/orders/:id
// Sample Data
/*
{
    "id": 552,
    "customer": {
        "id": 1,
        "fullname": "Leon Wong",
        "email": "leon2@leonwong.dev",
        "role": "ROLE_CUSTOMER"
    },
    "orderStatus": "PLACED",
    "createdAt": "2024-06-03T22:17:01.000+00:00",
    "address": {
        "id": 502,
        "street": "Sample address street",
        "city": "Toronto",
        "province": "Ontario",
        "country": "Canada",
        "postalCode": "M9W6V3"
    },
    "items": [
        {
            "id": 452,
            "product": {
                "id": 2,
                "name": "Naruto Figure 2",
                "description": "Test",
                "price": 50,
                "category": null,
                "imageUrl": "https://llllline.com/images/thumbs/naru/naruto-figure-3d-model-ready-to-print-stl-0000054872-800.jpeg",
                "creationDate": null
            },
            "quantity": 4,
            "totalPrice": 200
        }
    ],
    "totalItem": 1,
    "totalPrice": 200
}
*/
