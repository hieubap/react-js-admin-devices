const { createRef } = require("react");

const listener = createRef();
listener.current = {
  pendingRequest: [],
  resolves: [],
  refreshing: false,
};
let error401 = true;

function callAPI(apiURL) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error401) {
        if (!listener.current.refreshing) {
          listener.current.refreshing = true;
          callRefreshToken().then((res) => {
            error401 = false;
            console.log("Call refresh successfull");
            [...listener.current.pendingRequest].forEach((param, idx) =>
              callAPI(param).then(listener.current.resolves[idx])
            );
          });
        }

        listener.current.pendingRequest.push(apiURL);
        listener.current.resolves.push(resolve);
        // resolve({ code: 401 });
      } else {
        resolve({
          code: 200,
          message: "success API " + apiURL,
        });
      }
    }, 500);
  });
}

const callRefreshToken = () => {
  console.log("CALL refreshing");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};

const callApi1 = () => {
  return new Promise((resolve, reject) => {
    callAPI("API1 Call").then(resolve).catch(reject);
  });
};

const callApi2 = () => {
  return new Promise((resolve, reject) => {
    callAPI("API2 Call").then(resolve).catch(reject);
  });
};

callApi1().then((res) => {
  console.log("API1:" + JSON.stringify(res));
});
callApi2().then((res) => {
  console.log("API2:" + JSON.stringify(res));
});
