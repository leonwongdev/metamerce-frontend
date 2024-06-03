import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../api/axiosConfig";

const MyOrders = () => {
  // States
  const [orders, setOrders] = useState(null);

  // Redux
  const jwt = useSelector((state) => state.auth.jwt);

  useEffect(() => {
    // Fetch orders from the server
    // Set header with jwt
    // Display orders in a table
    // Display order id, order status, total price, and date
    // Display a button to view order details

    axiosInstance
      .get("/api/order", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        console.log("Orders Response: ", res);
        setOrders(res.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);

  function renderOrders() {
    return (
      <div className="bg-base-200 p-10 m-10 rounded-box">
        <table className="table">
          <thead>
            <tr>
              <th className="">Order ID</th>
              <th className="">Order Status</th>
              <th className="">Total Price</th>
              <th className="">Date</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order.id} class="hover">
                  <td className="">{order.id}</td>
                  <td className="">{order.orderStatus}</td>
                  <td className="">{order.totalPrice}</td>
                  <td className="">{order.createdAt}</td>
                  <td className="">
                    <button
                      className="btn btn-neutral"
                      // onClick={() => viewOrderDetails(order.id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <div>{renderOrders()}</div>;
};

export default MyOrders;

// Sample Order API Response
// Endpoint: GET /api/order
// Response:
/*
[
    {
        "id": 402,
        "customer": {
            "id": 1,
            "fullname": "Leon Wong",
            "email": "leon2@leonwong.dev",
            "role": "ROLE_CUSTOMER"
        },
        "orderStatus": "PLACED",
        "createdAt": "2024-06-02T22:53:21.000+00:00",
        "address": {
            "id": 352,
            "street": "123 Main St",
            "city": "Springfield",
            "province": "Illinois",
            "country": "USA",
            "postalCode": "62701"
        },
        "items": [
            {
                "id": 302,
                "product": {
                    "id": 2,
                    "name": "Naruto Figure 2",
                    "description": "Test",
                    "price": 50,
                    "category": null,
                    "imageUrl": "https://llllline.com/images/thumbs/naru/naruto-figure-3d-model-ready-to-print-stl-0000054872-800.jpeg",
                    "creationDate": null
                },
                "quantity": 2,
                "totalPrice": 100
            }
        ],
        "totalItem": 1,
        "totalPrice": 100
    },
    {
        "id": 502,
        "customer": {
            "id": 1,
            "fullname": "Leon Wong",
            "email": "leon2@leonwong.dev",
            "role": "ROLE_CUSTOMER"
        },
        "orderStatus": "PLACED",
        "createdAt": "2024-06-02T23:20:27.000+00:00",
        "address": {
            "id": 452,
            "street": "123 Main St",
            "city": "Springfield",
            "province": "Illinois",
            "country": "USA",
            "postalCode": "62701"
        },
        "items": [
            {
                "id": 402,
                "product": {
                    "id": 1,
                    "name": "Naruto Figure 1",
                    "description": "Test",
                    "price": 110,
                    "category": null,
                    "imageUrl": "https://img2.cgtrader.com/items/2895079/2f05452561/large/naruto-uzumaki-3d-model-stl.jpg",
                    "creationDate": "2024-06-02T20:11:08.000+00:00"
                },
                "quantity": 3,
                "totalPrice": 330
            }
        ],
        "totalItem": 1,
        "totalPrice": 330
    },
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
]
*/
