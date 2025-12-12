import axios from "axios";
import { store} from "../store/store";
import {logout} from "../features/auth/authSlice"

const api = axios.create({
    baseUrl: import.meta.env.VITE_API_URL ,
    withCredentials : false,
})

// REQUEST INTERCEPTOR
api.interceptors.request.use(
    (config) => {

        const state = store.getState();
        const token = state.auth.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;


    },
    (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Auto-logout when token expires / invalid
        if (error.response?.status === 401) {
            store.dispatch(logout())
        }

        return Promise.reject(error);
    }
);

export default api;
