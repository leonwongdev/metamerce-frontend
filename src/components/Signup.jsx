import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../redux/slice/authSlice";

function SignUp() {
  // Form states
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Hook
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    // Endpoint: POST /auth/signup
    e.preventDefault();
    // console.log("Form submitted");
    // console.log({ fullname, email, password, confirmPassword });

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    axiosInstance
      .post("/auth/signup", {
        fullname,
        email,
        password,
      })
      .then((res) => {
        console.log("Response: ", res);
        alert("User created successfully");
        // signup redux
        dispatch(signup({ email: email, jwt: res.data.jwt }));
        navigate("/");
      })
      .catch((error) => {
        console.error("Error: ", error);
        alert("An error occurred. Please try again.");
      });
  }
  return (
    <div className="min-h-screen h-full flex justify-center items-center">
      <div className="bg-base-200 p-5 lg:p-16 rounded shadow-2xl w-11/12">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Sign Up</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none"
            placeholder="Full Name"
            name="fullname"
            value={fullname}
            onChange={(e) => {
              setFullname(e.target.value);
            }}
          />
          <input
            type="email"
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
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <button type="submit" className="btn btn-neutral">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
