import axios from "axios";

export const getPagedVolumes = async ({ page, limit, keyword, slug }) => {
  const res = await axios.get(
    `http://localhost:3000/dashboard/book/${slug}/volume`,
    { 
      params: { page, limit, keyword },
      withCredentials: true
    }
  );
  return res.data;
}

export const createVolume = async (data, slug) => {
  return axios.post(
    `http://localhost:3000/dashboard/book/${slug}/volume/create`, data, 
    {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true
    }
  );
};

export const deleteVolume = async (slug, id) => {
  return axios.delete(
    `http://localhost:3000/dashboard/book/${slug}/volume/delete/${id}`,
  );
};