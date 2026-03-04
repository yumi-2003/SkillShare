import axiosInstance from "./axiosInstance";

export const getQuicksByCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`/api/quicks/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const completeQuick = async (quickId) => {
  try {
    const response = await axiosInstance.post(`/api/quicks/${quickId}/complete`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllQuicksAdmin = async () => {
  try {
    const response = await axiosInstance.get("/admin/quicks");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addQuickAdmin = async (quickData) => {
  try {
    const response = await axiosInstance.post("/admin/quicks", quickData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllBadgesAdmin = async () => {
  try {
    const response = await axiosInstance.get("/admin/badges");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addBadgeAdmin = async (badgeData) => {
  try {
    const response = await axiosInstance.post("/admin/badges", badgeData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
