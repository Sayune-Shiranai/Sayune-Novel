import axios from "axios";

export const getPagedRoles = async ({ page, limit, keyword }) => {
  const res = await axios.get(
    "http://localhost:3000/dashboard/role",
    { 
      params: { page, limit, keyword },
      withCredentials: true
    }
  );
  return res.data;
};

export const createRole = async (data) => {
  return axios.post(
    "http://localhost:3000/dashboard/role/create", data, 
    {
      withCredentials: true
    }
  );
};

export const deleteRole = async (id) => {
  return axios.delete(
    `http://localhost:3000/dashboard/role/delete/${id}`,
    {
      withCredentials: true
    }
  );
};