import { Method, getApiUrl, requestApi, requestData } from "./request";

export default {
  search: (param = {}) => requestApi(getApiUrl() + "/type-device", param),
  create: (body = {}) => requestData(getApiUrl() + "/type-device", body, Method.POST),
  update: (body = {}) => requestData(getApiUrl() + "/type-device", body, Method.PUT),
  delete: (id) => requestData(getApiUrl() + "/type-device/" + id, {}, Method.DELETE),
};
