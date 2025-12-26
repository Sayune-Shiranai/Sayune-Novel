import axios from "axios";

export const login = async (username, password) => {
  const res = await axios.post(
    "http://localhost:3000/login", 
    { username, password }, 
    { withCredentials: true }
  );
  return res.data;
};

export const register = async (data) => {
  const res = await axios.post("http://localhost:3000/register", data);
  return res.data;
};

export const logout = async () => {
  try {
    const res = await axios.post(
      "http://localhost:3000/logout",
      {},
      { withCredentials: true }
    );

    return res.data;
  } catch {
    throw new Error("Đăng xuất thất bại!");
  }
};

export const getProfile = async () => {
  try {
    const res = await axios.get(
      "http://localhost:3000/profile",
      { withCredentials: true }
    );

    return res.data;
  } catch {
    throw new Error("Chưa đăng nhập");
  }
};
