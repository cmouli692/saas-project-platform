// import api from "./axiosInstance";

// export const getTasksByProject = (projectId) => api.get(`/projects/${projectId}/tasks`);

// export const createTask = (projectId, data) => api.post(`/projects/${projectId}/tasks`, data);



// import api from "./axiosInstance";

// export const getTasks = async (projectId) => {
//   api.get(`/projects/${projectId}/tasks`);
// };

// export const createTask = async (projectId, data) => {
//   api.post(`/projects/${projectId}/tasks`, data);
// };

// export const deleteTask = async (projectId, taskId) => {
//   api.delete(`/projects/${projectId}/tasks/${taskId}`);
// };




import api from "./axiosInstance";

export const getTasksByProject = async (projectId) => {
  const res = await api.get(`/projects/${projectId}/tasks`);
  return res;
};

export const createTask = async (projectId, data) => {
  const res = await api.post(`/projects/${projectId}/tasks`, data);
  return res;
};

export const deleteTask = async (projectId, taskId) => {
  const res = await api.delete(
    `/projects/${projectId}/tasks/${taskId}`
  );
  return res;
};



