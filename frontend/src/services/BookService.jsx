import axios from "axios";


export const getPagedBooks = async ({ page, limit, keyword }) => {
  const res = await axios.get(
    "http://localhost:3000/dashboard/book",
    { params: { page, limit, keyword } }
  );
  return res.data;
}

export const getBookBySlug = (slug) => {
  return axios.get(`http://localhost:3000/dashboard/book/${slug}`);
};

export const createBook = async (data) => {
  return axios.post(
    "http://localhost:3000/dashboard/book/create", data, 
    {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true
    }
  );
};


export const updateBook = async (slug, data) => {
  return axios.put(
    `http://localhost:3000/dashboard/book/update/${slug}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true
    }
  );
}

export const deleteBook = async (id) => {
  return axios.delete(
    `http://localhost:3000/dashboard/book/${id}`
  );
};

export const approveBook = async (id) => {
  return axios.post(
    `http://localhost:3000/dashboard/book/approve/${id}`
  );
};

export const rejectBook = async (id) => {
  return axios.post(
    `http://localhost:3000/dashboard/book/reject/${id}`
  );
};