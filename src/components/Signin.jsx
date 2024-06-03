import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useSelector, useDispatch } from "react-redux";
import { signin, signout } from "../redux/slice/authSlice";

function SignIn() {
  const [email, setEmail] = useState("leon2@leonwong.dev");
  const [password, setPassword] = useState("12345678");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log("Email: ", email);
    console.log("Password", password);
    axiosInstance
      .post("/auth/signin", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log("Response: ", res);

        dispatch(signin({ email: email, jwt: res.data.jwt }));
        navigate("/");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };
  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="bg-base-200 p-16 rounded shadow-2xl w-2/3">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Sign In</h2>
        <form className="space-y-5" onSubmit={onFormSubmit}>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="btn btn-neutral" type="submit">
            Sign In
          </button>
          <Link to="/signup" className="btn bg-green-400 hover:bg-green-600">
            No account? Sign up here!
          </Link>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
