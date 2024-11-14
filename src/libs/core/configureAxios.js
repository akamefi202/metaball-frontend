import axios from "axios";
import { TOKEN_NAME } from "config";

export default function makeApi(baseURL) {
  const api = axios.create({
    baseURL,
  });

  api.defaults.headers.post["Content-Type"] = "application/json";
  api.defaults.headers.put["Content-Type"] = "application/json";
  api.defaults.headers.delete["Content-Type"] = "application/json";

  api.interceptors.request.use(
    (config) => {
      if (localStorage.getItem(TOKEN_NAME)) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${localStorage.getItem(TOKEN_NAME)}`,
        };
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response.data, // return data object
    (error) => Promise.reject(error)
  );
  return api;
}
