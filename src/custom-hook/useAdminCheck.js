import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useAdminCheck = () => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (role !== "ROLE_ADMIN") {
      navigate("/signin");
    }
  }, []);
};

export default useAdminCheck;
