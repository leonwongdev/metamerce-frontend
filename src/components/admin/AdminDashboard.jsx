import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const AdminDashboard = () => {
  // State

  // Hook
  const navigate = useNavigate();

  // Get user role
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    // check if user is ROLE_ADMIN
    if (role !== "ROLE_ADMIN") {
      // Redirect to home page
      navigate("/signin");
    }
  }, []);
  return (
    // Your JSX code goes here
    <div className="flex flex-col p-10 gap-10 justify-center items-center">
      <Link to="/admin/products" className="btn">
        Manage Products
      </Link>
      <Link to="/admin/orders" className="btn">
        Manage Orders
      </Link>
    </div>
  );
};

export default AdminDashboard;
