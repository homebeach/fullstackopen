import { useQuery } from "react-query";
import axios from "axios";

const baseUrl = "http://localhost:3001/api/users";
const userQueryKey = "users";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAllUsers = () => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

// Custom hook for fetching all users
export const useGetAllUsers = () => {
  return useQuery(userQueryKey, getAllUsers);
};

export default { getAllUsers, setToken, useGetAllUsers };
