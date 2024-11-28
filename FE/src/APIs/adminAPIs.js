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
  return await axiosInstance.post("/admin/addProduct", data, options);
};

export const getProducts = async () => {
  return await axiosInstance.get("/admin/getproducts", options);
};

export const updateAvailabilityProduct = async (id, data) => {
  return await axiosInstance.put(`/admin/updateProduct/${id}`, data, options);
};
