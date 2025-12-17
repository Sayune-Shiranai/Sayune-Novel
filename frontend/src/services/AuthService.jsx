export const logout = async () => {
  const res = await fetch("http://localhost:3000/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Đăng xuất thất bại!");
  }

  return res.json();
};

export const getProfile = async () => {
  const res = await fetch("http://localhost:3000/profile", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Chưa đăng nhập");
  }

  return res.json();
};
