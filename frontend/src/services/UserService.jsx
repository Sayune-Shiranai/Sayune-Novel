import axios from "axios";

export const getPagedUsers = async ({ page, limit, keyword }) => {
  const res = await axios.get(
    "http://localhost:3000/dashboard/user",
    { 
      params: { page, limit, keyword },
      withCredentials: true
    }
  );
  return res.data;
};

export const getUserById = (id) => {
  return axios.get(`http://localhost:3000/dashboard/user/${id}`,
    { 
      withCredentials: true
    }
  );
};

export const updateUser = async (id, data) => {
  return axios.put(
    `http://localhost:3000/dashboard/user/update/${id}`, 
    data,
    { 
      withCredentials: true
    }
  );
}

export const deleteUser = async (id) => {
  return axios.delete(
    `http://localhost:3000/dashboard/user/delete/${id}`,
    { 
      withCredentials: true
    }
  );
};

export const approveUser = async (id) => {
  return axios.post(
    `http://localhost:3000/dashboard/user/approve/${id}`,
    {},
    { 
      withCredentials: true
    }
  );
};

export const rejectUser = async (id) => {
  return axios.post(
    `http://localhost:3000/dashboard/user/reject/${id}`,
    {},
    { 
      withCredentials: true
    }
  );
};
