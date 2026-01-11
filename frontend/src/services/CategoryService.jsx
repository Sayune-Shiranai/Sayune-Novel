import axios from "axios";

export const getPagedCategories = async ({ page, limit, keyword }) => {
  const res = await axios.get(
    "http://localhost:3000/dashboard/category",
    { 
      params: { page, limit, keyword },
      withCredentials: true
    }
  );
  return res.data;
};

export const createCategory = async (data) => {
  return axios.post(
    "http://localhost:3000/dashboard/category/create", data, 
    {
      withCredentials: true
    }
  );
};

export const deleteCategory = async (id) => {
  return axios.delete(
    `http://localhost:3000/dashboard/category/delete/${id}`,
    {
      withCredentials: true
    }
  );
};

export const getAllCategories = async () => {
  const res = await axios.get("http://localhost:3000/dashboard/category"); //thay api đúng vào
  return res.data;
};

