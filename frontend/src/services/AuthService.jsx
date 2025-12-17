const logout = async () => {
  const res = await fetch("http://localhost:3000/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Đăng xuất thất bại!");
  }

  return res.json();
};

export default logout;