import axios from "axios";

const defaults = {
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3005",
  headers: () => ({
    "Content-Type": "application/json",
  }),
};

const api = (method, url, variables) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${defaults.baseURL}${url}`,
      method,
      headers: defaults.headers(),
      params: method === "get" ? variables : undefined,
      data: method !== "get" ? variables : undefined,
      //   paramsSerializer: objectToQueryString,
    }).then(
      (response) => {
        resolve({ ...response.data });
      },
      (error) => {
        reject(error.response.data.error);
      }
    );
  });
};

export default api;
