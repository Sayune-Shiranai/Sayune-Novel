import axios from "axios";

export const getPagedRoles = () => {
  return axios.get("http://localhost:3000/dashboard/role");
};
