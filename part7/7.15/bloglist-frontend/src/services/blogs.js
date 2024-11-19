import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
const baseUrl = "http://localhost:3001/api/blogs";

const blogQueryKey = "blogs";


let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = ({ id, newObject }) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};


const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

// Custom hook for fetching blogs
export const useGetAllBlogs = () => {
  return useQuery(blogQueryKey, getAll);
};

// Custom hook for creating a blog
export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries(blogQueryKey);
    },
  });
};

// Custom hook for updating a blog
export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries(blogQueryKey);
    },
  });
};

// Custom hook for deleting a blog
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation(remove, {
    onSuccess: () => {
      queryClient.invalidateQueries(blogQueryKey);
    },
  });
};

export default { getAll, setToken, create, update, remove, useGetAllBlogs, useCreateBlog, useUpdateBlog, useDeleteBlog };
