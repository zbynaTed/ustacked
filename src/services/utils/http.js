import axios from "axios";

import logger from "./logger";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) logger.log(error);
  console.log(error);
  console.log("Interceptor called.");

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

const http = {
  post: axios.post,
  get: axios.get,
  patch: axios.patch,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

export default http;
