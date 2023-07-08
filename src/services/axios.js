import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    Authorization: "",
  },
});

api.interceptors.request.use((config) => {
  if (config.method === "put" || config.method === "post") {
    const loadingToast = toast.promise(
      new Promise((resolve, reject) => {
        config.resolveLoadingToast = resolve;
        config.rejectLoadingToast = reject;
      }),
      {
        pending: "Promise is pending",
        // success: "Promise resolved 👌",
        theme: "light",
      }
    );

    config.loadingToast = loadingToast;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.config.method === "put" || response.config.method === "post") {
      response.config.resolveLoadingToast(response);
      toast.success(`${response?.data?.msg}`, {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    return response;
  },
  (error) => {
    if (error.config.method === "put" || error.config.method === "post") {
      error.config.rejectLoadingToast();
      toast.error(`Ocorreu um erro na requisição: ${error?.response?.data?.message}`, {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(`Ocorreu um erro`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    return error;
  }
);

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
