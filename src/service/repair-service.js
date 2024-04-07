import { Method, getApiUrl, requestApi, requestData } from "./request";

export default {
  search: (param = {}) => requestApi(getApiUrl() + "/repair", param),
  create: (body = {}) =>
    requestData(getApiUrl() + "/repair", body, Method.POST),
  update: (body = {}) => requestData(getApiUrl() + "/repair", body, Method.PUT),
  detail: (id) => requestData(getApiUrl() + "/repair/detail/" + id, {}, Method.GET),
  delete: (id) => requestData(getApiUrl() + "/repair/" + id, {}, Method.DELETE),
};
