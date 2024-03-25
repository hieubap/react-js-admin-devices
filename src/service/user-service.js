import { Method, getApiUrl, requestApi, requestData } from "./request";

export default {
  search: (param = {}) => requestApi(getApiUrl() + "/user", param),
  create: (body = {}) => requestData(getApiUrl() + "/user", body, Method.POST),
  update: (body = {}) => requestData(getApiUrl() + "/user", body, Method.PUT),
  delete: (id) => requestData(getApiUrl() + "/user/" + id, {}, Method.DELETE),
};
