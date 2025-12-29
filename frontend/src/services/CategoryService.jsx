import axios from "axios";

export const getPagedCategories = async ({ page, limit, keyword }) => {
  const res = await axios.get(
    "http://localhost:3000/dashboard/category",
    { params: { page, limit, keyword } }
  );
  return res.data;
};