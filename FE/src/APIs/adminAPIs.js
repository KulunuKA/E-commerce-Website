import axiosInstance from "../Services/axios instance";

const header = {
  "Content-Type": "application/json",
  Authorization: "",
};

const options = {
  headers: header,
};

export const login = async (data) => {
  return await axiosInstance.post("/admin/login", data, options);
};

export const addProduct = async (data) => {
  return await axiosInstance.post("/admin/addproduct", data, options);
};

export const getProducts = async () => {
  return await axiosInstance.get("/products", options);
};

export const updateProducts = async (id, data) => {
  return await axiosInstance.put(`/admin/updateproduct/${id}`, data, options);
};

export const deleteProduct = async (id) => {
  return await axiosInstance.delete(`/admin/deleteproduct/${id}`, options);
}

export const updateAvailabilityProduct = async (id, data) => {
  return await axiosInstance.put(`/admin/updateProduct/${id}`, data, options);
};
