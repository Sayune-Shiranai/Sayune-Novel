import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthorityRoute = ({ children, roles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  if (!user) {
    // toast.error("Bạn cần đăng nhập");
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.User_Role.role)) {
    toast.error("Bạn không có quyền truy cập trang này");
    return <Navigate to="/login" replace />;
  }

  return children;
};
