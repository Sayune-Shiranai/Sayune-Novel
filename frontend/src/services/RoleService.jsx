import axios from "axios";

export const getPagedRoles = async ({ page, limit, keyword }) => {
  const res = await axios.get(
    "http://localhost:3000/dashboard/role",
    { params: { page, limit, keyword } }
  );
  return res.data;
};

export const deleteRole = async (id) => {
  return axios.delete(
    `http://localhost:3000/dashboard/role/${id}`
  );
};