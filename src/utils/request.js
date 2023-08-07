import axios from "axios";

import NProgress from "nprogress";
// import { toast } from "react-toastify";
import { config } from "../constants";
import { toast } from "react-toastify";
const request = axios.create({
  baseURL: config.base_url,
  timeout: config.time_out,
});

request.interceptors.request.use(
  (config) => {
    config.headers.Authorization = localStorage.getItem("token")
      ? `Bearer ${localStorage.getItem("token")}`
      : "";
    NProgress.start();
    return config;
  },
  (error) => {
    NProgress.done();
    // check if error is section timeout
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();
    if (error.message.includes("5000")) {
      toast.error("Internal Server Error");
    } else if (error.response) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
    if (error?.response?.status === 401) {
      // logout user from store
    }
    return Promise.reject(error);
  }
);

export default request;

// ? Path: src/utils/request.js
