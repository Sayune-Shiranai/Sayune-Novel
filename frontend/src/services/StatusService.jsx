import axios from "axios";

export const getPagedStatus = async ({ page, limit, keyword }) => {
  const res = await axios.get(
    "http://localhost:3000/dashboard/status",
    { params: { page, limit, keyword } }
  );
  return res.data;
};