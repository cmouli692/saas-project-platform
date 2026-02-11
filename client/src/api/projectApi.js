import api from "./axiosInstance";

export const getProjects = async () => {
    const res = await api.get("/projects")
    return res.data; // expect {data, meta}

};

export const createProject = (data) => api.post("/projects", data);