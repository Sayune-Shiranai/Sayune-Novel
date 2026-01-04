import axios from "axios";

export const getPagedAuthors = async ({ page, limit, keyword }) => {
  const res = await axios.get(
    "http://localhost:3000/dashboard/author",
    { 
      params: { page, limit, keyword },
      withCredentials: true
    }
  );
  return res.data;
};

export const createAuthor = async (data) => {
  return axios.post(
    "http://localhost:3000/dashboard/author/create", data, 
    {
      withCredentials: true
    }
  );
};

export const deleteAuthor = async (id) => {
  return axios.delete(
    `http://localhost:3000/dashboard/author/delete/${id}`
  );
};