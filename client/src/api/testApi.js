import api from "./axiosInstance";

export const testInterceptor = async () => {
  const response = await api.get("https://httpbin.org/headers");
  return response.data;
};
