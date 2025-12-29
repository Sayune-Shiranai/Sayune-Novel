import axios from "axios";

export const getPagedAuthors = async ({ page, limit, keyword }) => {
  const res = await axios.get(
    "http://localhost:3000/dashboard/author",
    { params: { page, limit, keyword } }
  );
  return res.data;
};