import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosConfig";
import { Link } from "react-router-dom";
import useAdminCheck from "../../custom-hook/useAdminCheck";
import { useSelector } from "react-redux";

function ManageOrders() {
  // state

  const [orders, setOrders] = useState([]);

  // get jwt
  const jwt = useSelector((state) => state.auth.jwt);

  // hook
  useAdminCheck();

  useEffect(() => {
    // Fetch orders from the server
    axiosInstance
      .get("/api/order/all", { headers: { Authorization: `Bearer ${jwt}` } })
      .then((res) => {
        console.log("Orders Response: ", res);
        setOrders(res.data);
      })
      .catch((error) => {
        console.error("Orders Response Error: ", error);
      });
  }, []);

  const renderOrderTable = () => {
    return (
      <div className="bg-base-200 p-10 m-10 rounded-box">
        <h1 className="text-3xl text-center">Order List</h1>
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Action</th>
              <th>ID</th>
              <th>Customer</th>
              <th>Order Status</th>
              <th>Created At</th>
              <th>Address</th>
              <th>Total Item</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link
                    to={`/admin/orders/edit/${order.id}`}
                    className="btn btn-primary"
                  >
                    Update Status
                  </Link>
                </td>
                <td>{order.id}</td>
                <td>{order.customer.fullname}</td>
                <td>{order.orderStatus}</td>
                <td>{order.createdAt}</td>
                <td>
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.province}, {order.address.country},{" "}
                  {order.address.postalCode}
                </td>
                <td>{order.totalItem}</td>
                <td>{order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return <div>{renderOrderTable()}</div>;
}

export default ManageOrders;

// GET /api/order/all
/*
[
    {
        "id": 1,
        "customer": {
            "id": 52,
            "fullname": "Leon Wong",
            "email": "leon@leonwong.dev",
            "role": "ROLE_CUSTOMER"
        },
        "orderStatus": "PLACED",
        "createdAt": "2024-06-09T03:36:57.056+00:00",
        "address": {
            "id": 1,
            "street": "Sample address street",
            "city": "Toronto",
            "province": "Ontario",
            "country": "Canada",
            "postalCode": "M9W6V3"
        },
        "items": [],
        "totalItem": 1,
        "totalPrice": 110
    },
    {
        "id": 2,
        "customer": {
            "id": 52,
            "fullname": "Leon Wong",
            "email": "leon@leonwong.dev",
            "role": "ROLE_CUSTOMER"
        },
        "orderStatus": "PLACED",
        "createdAt": "2024-06-10T03:42:43.549+00:00",
        "address": {
            "id": 2,
            "street": "Sample address street",
            "city": "Toronto",
            "province": "Ontario",
            "country": "Canada",
            "postalCode": "M9W6V3"
        },
        "items": [],
        "totalItem": 1,
        "totalPrice": 100
    },
    {
        "id": 52,
        "customer": {
            "id": 52,
            "fullname": "Leon Wong",
            "email": "leon@leonwong.dev",
            "role": "ROLE_CUSTOMER"
        },
        "orderStatus": "PLACED",
        "createdAt": "2024-06-10T18:44:50.006+00:00",
        "address": {
            "id": 52,
            "street": "Sample address street",
            "city": "Toronto",
            "province": "Ontario",
            "country": "Canada",
            "postalCode": "M9W6V3"
        },
        "items": [
            {
                "id": 52,
                "product": {
                    "id": 52,
                    "name": "Innocent Buu",
                    "description": "Although he is one of the most powerful entities in Dragon Ball Z, Innocent Buu is often playful and displays his childish personality.",
                    "price": 2002,
                    "category": null,
                    "imageUrl": "https://leonwongdevstorageac.blob.core.windows.net/images/inno-buu.png",
                    "modelUrl": "https://leonwongdevstorageac.blob.core.windows.net/file/buu-test.glb",
                    "creationDate": null
                },
                "quantity": 1,
                "totalPrice": 100
            }
        ],
        "totalItem": 1,
        "totalPrice": 100
    },
    {
        "id": 53,
        "customer": {
            "id": 52,
            "fullname": "Leon Wong",
            "email": "leon@leonwong.dev",
            "role": "ROLE_CUSTOMER"
        },
        "orderStatus": "PLACED",
        "createdAt": "2024-06-10T19:58:07.831+00:00",
        "address": {
            "id": 53,
            "street": "Sample address street",
            "city": "Toronto",
            "province": "Ontario",
            "country": "Canada",
            "postalCode": "M9W6V3"
        },
        "items": [
            {
                "id": 53,
                "product": {
                    "id": 57,
                    "name": "Thanos",
                    "description": "A powerful Titan with a relentless quest for balance, seeks Infinity Stones to eradicate half of all life in the universe.",
                    "price": 290,
                    "category": null,
                    "imageUrl": "https://leonwongdevstorageac.blob.core.windows.net/images/thanos-fortnite.png",
                    "modelUrl": "https://leonwongdevstorageac.blob.core.windows.net/file/thanos-fortnite.glb",
                    "creationDate": null
                },
                "quantity": 1,
                "totalPrice": 290
            }
        ],
        "totalItem": 1,
        "totalPrice": 290
    },
    {
        "id": 54,
        "customer": {
            "id": 52,
            "fullname": "Leon Wong",
            "email": "leon@leonwong.dev",
            "role": "ROLE_CUSTOMER"
        },
        "orderStatus": "PLACED",
        "createdAt": "2024-06-10T20:01:56.209+00:00",
        "address": {
            "id": 54,
            "street": "Sample address street",
            "city": "Toronto",
            "province": "Ontario",
            "country": "Canada",
            "postalCode": "M9W6V3"
        },
        "items": [
            {
                "id": 54,
                "product": {
                    "id": 53,
                    "name": "Superman",
                    "description": "An alien from Krypton with superhuman strength, speed, flight, and invulnerability, dedicated to protecting Earth as a hero.",
                    "price": 110,
                    "category": null,
                    "imageUrl": "https://leonwongdevstorageac.blob.core.windows.net/images/superman.png",
                    "modelUrl": "https://leonwongdevstorageac.blob.core.windows.net/file/superman.glb",
                    "creationDate": null
                },
                "quantity": 1,
                "totalPrice": 110
            }
        ],
        "totalItem": 1,
        "totalPrice": 110
    },
    {
        "id": 102,
        "customer": {
            "id": 52,
            "fullname": "Leon Wong",
            "email": "leon@leonwong.dev",
            "role": "ROLE_CUSTOMER"
        },
        "orderStatus": "PLACED",
        "createdAt": "2024-06-16T21:53:51.037+00:00",
        "address": {
            "id": 102,
            "street": "Sample address street",
            "city": "Toronto",
            "province": "Ontario",
            "country": "Canada",
            "postalCode": "M9W6V3"
        },
        "items": [
            {
                "id": 102,
                "product": {
                    "id": 52,
                    "name": "Innocent Buu",
                    "description": "Although he is one of the most powerful entities in Dragon Ball Z, Innocent Buu is often playful and displays his childish personality.",
                    "price": 2002,
                    "category": null,
                    "imageUrl": "https://leonwongdevstorageac.blob.core.windows.net/images/inno-buu.png",
                    "modelUrl": "https://leonwongdevstorageac.blob.core.windows.net/file/buu-test.glb",
                    "creationDate": null
                },
                "quantity": 1,
                "totalPrice": 2002
            }
        ],
        "totalItem": 1,
        "totalPrice": 2002
    },
    {
        "id": 103,
        "customer": {
            "id": 102,
            "fullname": "Admin",
            "email": "admin@leonwong.dev",
            "role": "ROLE_ADMIN"
        },
        "orderStatus": "PLACED",
        "createdAt": "2024-06-16T21:58:14.548+00:00",
        "address": {
            "id": 103,
            "street": "Sample address street",
            "city": "Toronto",
            "province": "Ontario",
            "country": "Canada",
            "postalCode": "M9W6V3"
        },
        "items": [
            {
                "id": 103,
                "product": {
                    "id": 52,
                    "name": "Innocent Buu",
                    "description": "Although he is one of the most powerful entities in Dragon Ball Z, Innocent Buu is often playful and displays his childish personality.",
                    "price": 2002,
                    "category": null,
                    "imageUrl": "https://leonwongdevstorageac.blob.core.windows.net/images/inno-buu.png",
                    "modelUrl": "https://leonwongdevstorageac.blob.core.windows.net/file/buu-test.glb",
                    "creationDate": null
                },
                "quantity": 1,
                "totalPrice": 2002
            }
        ],
        "totalItem": 1,
        "totalPrice": 2002
    }
]
*/
