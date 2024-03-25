const clientUtils = {
  auth: "",
  serverApi: process.env.REACT_APP_SERVER_URL,
  requestApi({
    methodType,
    url,
    body,
    ignoreAuth = true,
    isUseServiceUrl = false,
  }) {
    return new Promise((resolve, reject) => {
      if (!body) body = {};

      if (methodType.toLowerCase() !== "get") {
        body = JSON.stringify(body);
      }
      url = isUseServiceUrl ? this.serverApi + url : url;
      this.requestFetch(
        methodType,
        url && url.indexOf("http") === 0 ? url : url,
        ignoreAuth
          ? {
              Accept: "application/json",
              "Content-Type": "application/json",
            }
          : {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: this.auth,
            },
        body
      )
        .then((s) => {
          s.json()
            .then((val) => {
              resolve(val);
            })
            .catch((e) => {
              reject(e);
            });
        })
        .catch((e) => {
          if (
            e &&
            [401, 403].includes(e.status) &&
            window.location.pathname != "/"
          ) {
            window.fetchErrorFlag = true;
            this.auth = null;
            window?.resign();
          }
          reject(e);
        });
    });
  },
  requestFetch(methodType, url, headers, body) {
    return new Promise((resolve, reject) => {
      let fetchParam = {
        method: methodType,
        headers,
      };
      if (methodType.toLowerCase() !== "get") {
        fetchParam.body = body;
      }
      return fetch(url, fetchParam)
        .then((json) => {
          if (!json.ok) {
            reject(json);
          } else resolve(json);
        })
        .catch((e) => {
          // window.location.href = "/maintain";
          reject(e);
        });
    });
  },
  upload({ methodType, url, form, isUseServiceUrl = true }) {
    return new Promise((resolve, reject) => {
      url = isUseServiceUrl ? this.serverApi + url : url;

      return this.requestFetch(
        methodType,
        url && url.indexOf("http") === 0 ? url : url,
        {
          Authorization: this.auth,
        },
        form
      )
        .then((s) => {
          s.json()
            .then((val) => {
              if (val.code === 401) {
              }
              resolve(val);
            })
            .catch((e) => {
              reject(e);
            });
        })
        .catch((e) => {
          if (e && e.status === 401) {
          }
          reject(e);
        });
    });
  },
  getFilePath({ url }) {
    return this.serverApi + "/files/" + url;
  },
  requestApiReport(methodType, url, body) {
    return new Promise(async (resolve, reject) => {
      var dataBody = "";
      if (!body) body = {};
      dataBody = JSON.stringify(body);
      this.requestFetch(
        methodType,
        this.serverApi + url,
        {
          Authorization: this.auth,
        },
        dataBody
      )
        .then((s) => {
          s.blob().then((blob) => {
            let blobUrl = URL.createObjectURL(blob);
            resolve(blobUrl);
          });
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};

export default clientUtils;
