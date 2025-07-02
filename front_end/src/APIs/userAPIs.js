import axiosInstance from "../Services/axios instance";

const header = {
  "Content-Type": "application/json",
  Authorization: "",
};

const options = {
  headers: header,
};

export const loginUser = async (data) => {
  return await axiosInstance.post("/users/login", data);
};

export const registerUser = async (data) => {
  return await axiosInstance.post("/users/register", data);
};

export const fetchHomeData = async () => {
  return await axiosInstance.get(`/products`);
};

export const getOneProduct = async (id) => {
  return await axiosInstance.get(`/products/${id}`);
};

export const filterProduct = async (gender, category, limit) => {
  return await axiosInstance.get(
    `/products?gender=${gender}&category=${category}&limit=${limit}`,
    options
  );
};

export const autoCompleteProduct = async (keyword) => {
  return await axiosInstance.get(`/products/autocomplete?keyword=${keyword}`);
};

export const getCart = async (id) => {
  return await axiosInstance.get(`/users/cart/${id}`, options);
};

export const addCart = async (data, id) => {
  return await axiosInstance.post(`/users/cart/${id}`, data, options);
};

export const deleteCart = async (id, productId) => {
  return await axiosInstance.delete(`/users/cart/${id}/${productId}`, options);
};
