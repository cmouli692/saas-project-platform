import api from "./axiosInstance";

export const getTasksByProject = (projectId) => api.get(`/projects/${projectId}/tasks`);

export const createTask = (projectId, data) => api.post(`/projects/${projectId}/tasks`, data);