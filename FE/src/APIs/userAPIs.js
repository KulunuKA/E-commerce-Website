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
  return await axiosInstance.get(`/users/products?limit=8`);
};

export const getOneProduct = async (id) => {
  return await axiosInstance.get(`/users/getProduct/${id}`);
};

export const filterProduct = async (category, limit) => {
  return await axiosInstance.get(
    `/products/getproducts?category=${category}&limit=${limit}`,
    options
  );
};
export const getCart = async (id) => {
  return await axiosInstance.get(`/cart/getCart/${id}`, options);
};

export const addCart = async (data, id) => {
  return await axiosInstance.post(`/cart/addCart/${id}`, data, options);
};

export const deleteCart = async (id) => {
  return await axiosInstance.delete(`/cart/delete/${id}`, options);
};
