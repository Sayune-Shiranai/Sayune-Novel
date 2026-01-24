import axios from "axios";


export const getPagedBooks = async ({ page, limit, keyword }) => {
  const res = await axios.get(
    "http://localhost:3000/dashboard/book",
    { 
      params: { page, limit, keyword },
      withCredentials: true
    }
  );
  return res.data;
}

export const getBookBySlug = (slug) => {
  return axios.get(`http://localhost:3000/dashboard/book/${slug}`,
    { 
      withCredentials: true
    }
  );
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
  return axios.post(
    `http://localhost:3000/dashboard/book/update/${slug}`, data, 
    {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true
    }
  );
}

export const deleteBook = async (id) => {
  return axios.delete(
    `http://localhost:3000/dashboard/book/delete/${id}`,
    { 
      withCredentials: true
    }
  );
};

export const approveBook = async (id) => {
  return axios.post(
    `http://localhost:3000/dashboard/book/approve/${id}`,
    {},
    { 
      withCredentials: true
    }
  );
};

export const rejectBook = async (id) => {
  return axios.post(
    `http://localhost:3000/dashboard/book/reject/${id}`,
    {},
    { 
      withCredentials: true
    }
  );
};

export const getBooksByCategory = async (category_id) => {
  const res = await axios.get(
    "http://localhost:3000/dashboard/book",
    {
      params: { 
        category_id
      }
    }
  );
  return res.data;
};

export const GetAllBook = async () => {
  const res = await axios.get(
    "http://localhost:3000/book",
    {
      withCredentials: true
    }
  );
  return res.data;
};


export const GetBookCreateByUser = async () => {
  const res = await axios.get(
    "http://localhost:3000/book/user",
    {
      withCredentials: true
    }
  );
  return res.data;
};

export const GetBook = async ( slug ) => {
  const res = await axios.get(
    `http://localhost:3000/book/${slug}`,
    {
      withCredentials: true
    }
  );
  return res.data;
};

export const FollowBook = async ( slug ) => {
  const res = await axios.get(
    `http://localhost:3000/book/${slug}/follow`,
    {
      withCredentials: true
    }
  );
  return res.data;
};

export const UnfollowBook = async ( slug ) => {
  const res = await axios.get(
    `http://localhost:3000/book/${slug}/unfollow`,
    {
      withCredentials: true
    }
  );
  return res.data;
};
