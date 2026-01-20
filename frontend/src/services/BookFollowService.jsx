import axios from "axios";


export const getPagedBookFollows = async ({ page, limit, keyword }) => {
  const res = await axios.get(
    "http://localhost:3000/dashboard/bookfollowing",
    { 
      params: { page, limit, keyword },
      withCredentials: true
    }
  );
  return res.data;
}

export const GetAllUserFollowBook = async ({ page, limit, keyword, slug }) => {
  const res = await axios.get(
    `http://localhost:3000/dashboard/bookfollowing/${slug}`,
    { 
      params: { page, limit, keyword },
      withCredentials: true
    }
  );
  return res.data;
}

export const GetMyFollowedBooks = async () => {
  const res = await axios.get(
    "http://localhost:3000/bookfollowing",
    { 
      withCredentials: true 
    }
  );
  return res.data;
}