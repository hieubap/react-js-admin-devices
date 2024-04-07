import { Method, getApiUrl, requestApi, requestData } from "./request";

export default {
  search: (param = {}) => requestApi(getApiUrl() + "/audit", param),
  create: (body = {}) => requestData(getApiUrl() + "/audit", body, Method.POST),
  update: (body = {}) => requestData(getApiUrl() + "/audit", body, Method.PUT),
  delete: (id) => requestData(getApiUrl() + "/audit/" + id, {}, Method.DELETE),
};
