import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ProductDetail from "./components/ProductDetail.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Navbar from "./components/Navbar.jsx";
import Cart from "./components/Cart.jsx";
import SignUp from "./components/Signup.jsx";
import SignIn from "./components/Signin.jsx";
import MyOrders from "./components/MyOrders.jsx";
import OrderDetail from "./components/OrderDetail.jsx";

function Layout() {
  return (
    <div className="layout w-full">
      <Navbar />
      <Outlet /> {/* This is where child routes will render */}
    </div>
  );
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <App /> },
      { path: "product/:id", element: <ProductDetail /> },
      // Cart
      { path: "cart", element: <Cart /> },
      // Signin
      { path: "signin", element: <SignIn /> },
      // Signup
      { path: "signup", element: <SignUp /> },
      // My orders
      { path: "myorders", element: <MyOrders /> },
      // Order Detail
      { path: "order/:id", element: <OrderDetail /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
