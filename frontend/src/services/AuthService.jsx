const logout = () => {
  return fetch("http://localhost:3000/logout", {
    method: "POST",
    credentials: "include",
  });
};

export default logout;