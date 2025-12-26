import axios from "axios";

export const getPagedUsers = async ({ page, limit, keyword }) => {
  const res = await axios.get(
    "http://localhost:3000/dashboard/user",
    { params: { page, limit, keyword } }
  );
  return res.data;
};

export const deleteUser = async (id) => {
  return axios.delete(
    `http://localhost:3000/dashboard/user/${id}`
  );
};

export const approveUser = async (id) => {
  return axios.post(
    `http://localhost:3000/dashboard/user/approve/${id}`
  );
};

export const rejectUser = async (id) => {
  return axios.post(
    `http://localhost:3000/dashboard/user/reject/${id}`
  );
};
