import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthorityRoute = ({ children, roles }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const toastShown = useRef(false);

  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    if (isLoginPage) return;

    if (!loading && !user && !toastShown.current) {
      toast.error("Bạn cần đăng nhập");
      toastShown.current = true;
    }

    console.log("User role:", user?.User_Role?.role);

    console.log("role:", user?.role);

    if (
      !loading &&
      user &&
      roles &&
      !roles.includes(user?.role) &&
      !toastShown.current
    ) {
      toast.error("Bạn không có quyền truy cập trang này");
      toastShown.current = true;
    }
  }, [loading, user, roles, isLoginPage]);

  if (loading) {
    return <div>Đang kiểm tra quyền truy cập...</div>;
  }

  if (!user && !isLoginPage) {
    return <Navigate to="/login" replace />;
  }

  if (
    user &&
    roles &&
    !roles.includes(user?.role)
  ) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
