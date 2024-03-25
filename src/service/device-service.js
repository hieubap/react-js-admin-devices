import { Method, getApiUrl, requestApi, requestData } from "./request";

export default {
  search: (param = {}) => requestApi(getApiUrl() + "/device", param),
  create: (body = {}) => requestData(getApiUrl() + "/device", body, Method.POST),
  update: (body = {}) => requestData(getApiUrl() + "/device", body, Method.PUT),
  assign: (body = {}) => requestData(getApiUrl() + "/device/assign", body, Method.PUT),
  delete: (id) => requestData(getApiUrl() + "/device/" + id, {}, Method.DELETE),
};
