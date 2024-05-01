import store from "@/redux/index";
import axios from "axios";

export const headers = {
  Authorization: "Bearer ",
  "Content-Type": "application/json",
  "If-None-Match": "",
  timezone_offset: new Date().getTimezoneOffset() / 60,
};

const client = axios.create({
  // baseURL: `${HOST}`,
  // withCredentials: false,

  headers,
});

client.interceptors.request.use(async (config = {}) => {
  let token = "Bearer " + store.getState()?.auth.token;
  console.log(token, "token...");
  if (token && !config.ignoreToken) {
    config.headers = {
      ...config.headers,
      Authorization: token,
    };
  }
  config.timeout = 20000;
  console.log(config, "config...", config.ignoreToken);
  return config;
});

client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const Method = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  OPTIONS: "options",
  HEAD: "head",
  PATCH: "patch",
};
export const getApiUrl = (origin) => {
  // const url = store.getState().application.HOST;
  const domain = window.location.origin.includes("14.225.205.222")
    ? "http://14.225.205.222:8800"
    : "http://localhost:8800";

  return domain + (origin ? "" : "/devices");
};

export const getApiFile = () => {
  return getApiUrl(true) + "/upload/public?path=";
};

export const convertFileUrl = (url) => {
  if (["https://", "http://", "file://"].some((i) => url.startsWith(i)))
    return url;
  return getApiUrl(true) + "/upload/public?path=" + url;
  // return "https://datahub.ivirse.com/api";
};
// export const getPrefixFile = () => {
//   return getApi;
// };

export const requestApi = async (url, data, method = Method.GET) => {
  try {
    console.log(url, "url", data);

    const response = await client[method](
      ...(method === Method.GET
        ? [url, { params: data, headers }]
        : [url, data, { headers }])
    );

    // console.log(response, "response_api");

    return response;
  } catch (e) {
    if (e?.code) {
      return e;
    }
    throw new Error(e);
  }
};

export const requestData = async (
  url,
  data,
  method = Method.GET,
  onError = (e) => {}
) => {
  try {
    console.log("requestData", url);
    const response = await client[method](
      ...(method === Method.GET
        ? [url, { params: data, headers }]
        : [url, data, { headers }])
    );

    if (response.code === 200 || response.code === 0) {
      return response.data;
    } else {
      return Promise.reject(response.message);
    }
  } catch (e) {
    throw new Error(e.message || e?.toString());
  }
};
