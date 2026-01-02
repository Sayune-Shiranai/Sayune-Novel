import axios from "axios";

export const getPagedArtists = async ({ page, limit, keyword }) => {
  const res = await axios.get(
    "http://localhost:3000/dashboard/artist",
    { params: { page, limit, keyword } }
  );
  return res.data;
};

export const deleteArtist = async (id) => {
  return axios.delete(
    `http://localhost:3000/dashboard/artist/${id}`
  );
};