import clientUtils from "@/utils/client-utils";
const baseUrl = "/user";
const userServiceProvider = {
  login(data) {
    let url = `${baseUrl}/login`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          methodType: "POST",
          url,
          isUseServiceUrl: true,
          body: data,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  requestNormalAdmin(data) {
    let url = `${baseUrl}/admin`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          methodType: "POST",
          url,
          isUseServiceUrl: true,
          body: data,
          ignoreAuth: false,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },

  requestMasterAdmin(data) {
    let url = `${baseUrl}/master-admin`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          methodType: "POST",
          url,
          isUseServiceUrl: true,
          body: data,
          ignoreAuth: false,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  requestTokenAdmin(data) {
    let url = `${baseUrl}/token-admin`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          methodType: "POST",
          url,
          isUseServiceUrl: true,
          body: data,
          ignoreAuth: false,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  requestAllocationAdmin(data) {
    let url = `${baseUrl}/allocation-admin`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          methodType: "POST",
          url,
          isUseServiceUrl: true,
          body: data,
          ignoreAuth: false,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  rename(data) {
    let url = `${baseUrl}/rename`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          methodType: "PUT",
          url,
          isUseServiceUrl: true,
          body: data,
          ignoreAuth: false,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  /**
   * Admin community
   */
  requestRevokeAdmin(data) {
    let url = `${baseUrl}/request-revoke-admin`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          methodType: "PUT",
          url,
          isUseServiceUrl: true,
          body: data,
          ignoreAuth: false,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  requestBackAdmin(data) {
    let url = `${baseUrl}/request-back-admin`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          methodType: "PUT",
          url,
          isUseServiceUrl: true,
          body: data,
          ignoreAuth: false,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  requestProposeAdmin(data) {
    let url = `${baseUrl}/request-propose-admin`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          methodType: "PUT",
          url,
          isUseServiceUrl: true,
          body: data,
          ignoreAuth: false,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  deleteRequestAdmin(body) {
    let url = `${baseUrl}/delete-request-admin`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          methodType: "DELETE",
          url,
          isUseServiceUrl: true,
          ignoreAuth: false,
          body,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  /**
   * Master admin community
   */
  requestRevokeMasterAdmin(data) {
    let url = `${baseUrl}/request-revoke-master-admin`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          methodType: "PUT",
          url,
          isUseServiceUrl: true,
          body: data,
          ignoreAuth: false,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  requestBackMasterAdmin(data) {
    let url = `${baseUrl}/request-back-master-admin`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          methodType: "PUT",
          url,
          isUseServiceUrl: true,
          body: data,
          ignoreAuth: false,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  requestProposeMasterAdmin(data) {
    let url = `${baseUrl}/request-propose-master-admin`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          methodType: "PUT",
          url,
          isUseServiceUrl: true,
          body: data,
          ignoreAuth: false,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  deleteRequestMasterAdmin(body) {
    let url = `${baseUrl}/delete-request-master-admin`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          methodType: "DELETE",
          url,
          isUseServiceUrl: true,
          ignoreAuth: false,
          body,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  /**
   * Token admin community
   */
  requestRevokeTokenAdmin(data) {
    let url = `${baseUrl}/request-revoke-token-admin`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          methodType: "PUT",
          url,
          isUseServiceUrl: true,
          body: data,
          ignoreAuth: false,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  requestBackTokenAdmin(data) {
    let url = `${baseUrl}/request-back-token-admin`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          methodType: "PUT",
          url,
          isUseServiceUrl: true,
          body: data,
          ignoreAuth: false,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  requestProposeTokenAdmin(data) {
    let url = `${baseUrl}/request-propose-token-admin`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          methodType: "PUT",
          url,
          isUseServiceUrl: true,
          body: data,
          ignoreAuth: false,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  deleteRequestTokenAdmin(body) {
    let url = `${baseUrl}/delete-request-token-admin`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          methodType: "DELETE",
          url,
          isUseServiceUrl: true,
          ignoreAuth: false,
          body,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  /**
   * Allocation admin community
   */
  requestRevokeAllocationAdmin(data) {
    let url = `${baseUrl}/request-revoke-allocation-admin`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          methodType: "PUT",
          url,
          isUseServiceUrl: true,
          body: data,
          ignoreAuth: false,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  requestBackAllocationAdmin(data) {
    let url = `${baseUrl}/request-back-allocation-admin`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          methodType: "PUT",
          url,
          isUseServiceUrl: true,
          body: data,
          ignoreAuth: false,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  requestProposeAllocationAdmin(data) {
    let url = `${baseUrl}/request-propose-allocation-admin`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          methodType: "PUT",
          url,
          isUseServiceUrl: true,
          body: data,
          ignoreAuth: false,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  deleteRequestAllocationAdmin(body) {
    let url = `${baseUrl}/delete-request-allocation-admin`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          methodType: "DELETE",
          url,
          isUseServiceUrl: true,
          ignoreAuth: false,
          body,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },
  logout() {
    let url = `${baseUrl}/logout`;
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({
          ignoreAuth: false,
          methodType: "POST",
          url,
          isUseServiceUrl: true,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => reject(e))
        .finally(() => {
          clientUtils.auth = "";
        });
    });
  },
};

export default userServiceProvider;
