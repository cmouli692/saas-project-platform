// import axios from "axios";
// import { store } from "../store/store";
// import { logout } from "../features/auth/authSlice";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
// });

// // REQUEST INTERCEPTOR
// api.interceptors.request.use(
//   (config) => {
//     const state = store.getState();
//     const token = state.auth.token;

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// // RESPONSE INTERCEPTOR
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Auto-logout when token expires / invalid
//     if (error.response?.status === 401) {
//       store.dispatch(logout());
//     }

//     return Promise.reject(error);
//   },
// );

// export default api;

// import axios from "axios";

// import { store } from "../store/store";
// import { logout } from "../features/auth/authSlice";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
// });

// // REQUEST: attach token
// api.interceptors.request.use(
//   (config) => {
//     const token = store.getState().auth.token;
//     console.log("Attaching token to request:", token);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// // RESPONSE: auto logout on 401
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if(error.response?.status === 401 ) {
//       store.dispatch(logout())
//     }
//     return Promise.reject(error);
//   }
  
// )

// export default api;

import axios from "axios";
import { store } from "../store/store";
import { logout } from "../features/auth/authSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// DEBUG (remove after confirm)
console.log("AXIOS BASE URL:", import.meta.env.VITE_API_URL);

// REQUEST: attach token (skip login)
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    console.log("Attaching token to request:", token);

    // ❗ skip token for login
    if (!config.url.includes("/auth/login") && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// RESPONSE: auto logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  },
);

export default api;

