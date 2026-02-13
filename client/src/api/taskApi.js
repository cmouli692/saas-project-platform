// import api from "./axiosInstance";


// export const getTasksByProject = (projectId) => api.get(`/projects/${projectId}/tasks`);

// export const createTask = (projectId, data) => api.post(`/projects/${projectId}/tasks`, data);


import api from "./axiosInstance";

export const getTasks = async (projectId) => {
    api.get(`/projects/${projectId}/tasks`);
}

export const createTask = async (projectId , data) => {
    api.post(`/projects/${projectId}/tasks`, data);
}

export const deleteTask = async (projectId , taskId) => {
    api.delete(`/projects/${projectId}/tasks/${taskId}`);
}