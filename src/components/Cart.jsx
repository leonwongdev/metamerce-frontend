import {useNavigate, useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import axiosInstance from "../api/axiosConfig";
import LoadingButton from "./LoadingButton.jsx";

export default function Cart() {
    // States
    const [cartData, setCartData] = useState(null);

    // Form states
    const [street, setStreet] = useState("Sample address street");
    const [city, setCity] = useState("Toronto");
    const [province, setProvince] = useState("Ontario");
    const [country, setCountry] = useState("Canada");
    const [postalCode, setPostalCode] = useState("M9W6V3");
    const [modalMessage, setModalMessage] = useState("");
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // Hook
    const navigate = useNavigate();
    const location = useLocation();
    // Redux
    const jwt = useSelector((state) => state.auth.jwt);

    useEffect(() => {
        if (!jwt) {
            // Redirect to the login page and pass the current location as state
            navigate("/signin", {state: {from: location}});
        }
        axiosInstance
            .get("/api/cart", {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            .then((res) => {
                console.log("Get all Cart items Response: ", res);
                setCartData(res.data);
            })
            .catch((error) => {
                console.error("Error: ", error);
                if (error.response.data.message === "Invalid Token") {
                    console.log("Invalid Token");
                    navigate("/signin");
                }
            });
    }, []);

    function handleDelete(id) {
        // DELETE /api/cart/remove?productId=2
        axiosInstance
            .delete(`/api/cart/remove?productId=${id}`, {
                headers: {Authorization: `Bearer ${jwt}`},
            })
            .then((res) => {
                console.log("Response: ", res);
                setCartData(res.data);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }

    function onPlaceOrder(e) {
        e.preventDefault();
        console.log("Placing order");

        // Check if cart is empty
        if (cartData === null || cartData.cartItems.length === 0) {
            setModalMessage("Cart is empty, please add items to cart first");
            document.getElementById("modal-1").showModal();
            return;
        }

        // Validate form
        // Check if all fields are filled, use trim to remove whitespace
        // Else alert user to fill in all fields
        if (
            street.trim() === "" ||
            city.trim() === "" ||
            province.trim() === "" ||
            country.trim() === "" ||
            postalCode.trim() === ""
        ) {
            setModalMessage("Please fill in all fields to place order");
            document.getElementById("modal-1").showModal();
            return;
        }
        setIsLoading(true);
        // API:POST /api/order/place
        axiosInstance
            .post(
                "/api/order/place",
                {
                    street: street,
                    city: city,
                    province: province,
                    country: country,
                    postalCode: postalCode,
                },
                {
                    headers: {Authorization: `Bearer ${jwt}`},
                }
            )
            .then((res) => {
                console.log("Place order Response: ", res);
                setOrderPlaced(true);
                setIsLoading(false);
                setModalMessage("Congrats! Order placed successfully!");

                document.getElementById("modal-1").showModal();
            })
            .catch((error) => {
                setOrderPlaced(false);
                setIsLoading(false);
                setModalMessage("Failed to place order, please contact us");

                document.getElementById("modal-1").showModal();
                console.error("Place Order Error: ", error);
            });
    }

    function renderModal() {
        return (
            <>
                {/* <button
          className="btn"
          onClick={() => document.getElementById("modal-1").showModal()}
        >
          open modal
        </button> */}
                <dialog id="modal-1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Dear Customer</h3>
                        <p className="py-4">{modalMessage}</p>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button
                                    className="btn"
                                    onClick={() => {
                                        if (orderPlaced) {
                                            navigate("/myorders");
                                        }
                                    }}
                                >
                                    Close
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </>
        );
    }

    function renderAddressForm() {
        return (
            <div>
                <h1 className="text-2xl font-bold ml-10 mb-4">
                    Fill in the form below to place order:
                </h1>
                <form
                    onSubmit={onPlaceOrder}
                    className="px-10 flex flex-col gap-3 bg-base-200 rounded-box mx-10 py-10"
                >
                    <label htmlFor="street" className="text-lg font-semibold">
                        Street
                    </label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        placeholder="Street"
                        className="input input-bordered"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                    <label htmlFor="city" className="text-lg font-semibold">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="City"
                        className="input input-bordered"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <label htmlFor="province" className="text-lg font-semibold">
                        Province
                    </label>
                    <input
                        type="text"
                        id="province"
                        name="province"
                        placeholder="Province"
                        className="input input-bordered"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                    />
                    <label htmlFor="country" className="text-lg font-semibold">
                        Country
                    </label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        placeholder="Country"
                        className="input input-bordered"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <label htmlFor="postalCode" className="text-lg font-semibold">
                        Postal Code
                    </label>
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        placeholder="Postal Code"
                        className="input input-bordered"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                    {/*<button className="btn btn-primary bg-yellow-400 border-yellow-400 hover:bg-yellow-600">*/}
                    {/*  Place Order*/}
                    {/*</button>*/}
                    <LoadingButton label={"Place Order"}
                                   styleClasses={"btn-primary bg-yellow-400 border-yellow-400 hover:bg-yellow-600"}
                                   isLoading={isLoading}

                    />
                </form>
            </div>
        );
    }

    function renderCartItems() {
        console.log("🚀 ~ renderCartItems ~ cartData:", cartData);
        if (cartData !== null) {
            return cartData.cartItems.map((item) => (
                <>
                    <div
                        key={item.id}
                        className="flex flex-row items-center p-4 bg-base-200 shadow-md gap-5"
                    >
                        <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-16 h-16"
                        />

                        <div className="ml-4">
                            <h3 className="text-lg font-semibold">{item.product.name}</h3>
                            <p className="text-gray-500">Quantity: {item.quantity}</p>
                            <p className="text-gray-500">Total Cost: ${item.totalPrice}</p>
                        </div>
                        <button
                            className="btn btn-error btn-sm"
                            onClick={() => handleDelete(item.product.id)}
                        >
                            Remove
                        </button>
                    </div>
                </>
            ));
        }
        return null;
    }

    function renderCartTotal() {
        if (cartData !== null) {
            return (
                <div className="mt-4 text-left">
                    <p className="text-lg font-semibold">
                        Total Price: ${cartData.total}
                    </p>
                </div>
            );
        }
        return null;
    }

    return (
        <div className="pb-10 w-full">
            {renderModal()}
            <div className="p-10 flex gap-3 flex-col">
                <h1 className="text-2xl font-bold">Cart Summary</h1>
                {renderCartItems()}
                {renderCartTotal()}
            </div>

            <div>{renderAddressForm()}</div>
        </div>
    );
}

// Sample Data
// const cartData = {
//   id: 2,
//   total: 430,
//   cartItems: [
//     {
//       id: 202,
//       product: {
//         id: 1,
//         name: "Naruto Figure 1",
//         description: "Test",
//         price: 110,
//         category: null,
//         imageUrl:
//           "https://img2.cgtrader.com/items/2895079/2f05452561/large/naruto-uzumaki-3d-model-stl.jpg",
//         creationDate: "2024-06-02T20:11:08.000+00:00",
//       },
//       quantity: 3,
//       totalPrice: 330,
//     },
//     {
//       id: 203,
//       product: {
//         id: 2,
//         name: "Naruto Figure 2",
//         description: "Test",
//         price: 50,
//         category: null,
//         imageUrl:
//           "https://llllline.com/images/thumbs/naru/naruto-figure-3d-model-ready-to-print-stl-0000054872-800.jpeg",
//         creationDate: null,
//       },
//       quantity: 2,
//       totalPrice: 100,
//     },
//   ],
// };

// const address = {
//   street: "123 Main St",
//   city: "Springfield",
//   province: "Illinois",
//   country: "USA",
//   postalCode: "62701",
// };
