import axios from "axios";

export const getPagedArtists = async ({ page, limit, keyword }) => {
  const res = await axios.get(
    "http://localhost:3000/dashboard/artist",
    { 
      params: { page, limit, keyword },
      withCredentials: true
    }
  );
  return res.data;
};

export const createArtist = async (data) => {
  return axios.post(
    "http://localhost:3000/dashboard/artist/create", data, 
    {
      withCredentials: true
    }
  );
};

export const deleteArtist = async (id) => {
  return axios.delete(
    `http://localhost:3000/dashboard/artist/delete/${id}`,
    {
      withCredentials: true
    }
  );
};