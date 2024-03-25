import userServiceProvider from "../../../../data-access/user-service-provider";
import clientUtils from "@/utils/client-utils";
import { genAuthSignature } from "@/utils/signature";
import StorageUtils from "@/utils/storage-utils";
export default {
  state: {
    authenticationData: {},
    token: "",
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
    resetState() {
      return {};
    },
  },
  effects: (dispatch) => ({
    generateToken: ({ history }, state) => {
      const signer = state.contracts.signer;

      return new Promise((resolve, reject) => {
        genAuthSignature(signer)
          .then((data) => {
            return userServiceProvider.login({
              data,
            });
          })
          .then((res) => {
            if (res.code == 200) {
              clientUtils.auth = `Bearer ${res?.data?.access_token}`;
              StorageUtils.save(`auth`, res.data);
              if (window.location.pathname === "/") {
                history.push("/tutorial");
              }
              dispatch.auth.updateData({
                authenticationData: res.data,
              });
              resolve(res);
            } else {
              reject(res);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    setAuthenticationData({ authData = {} }) {
      console.log(authData, "authData");
      dispatch.auth.updateData({
        authenticationData: authData,
        token: authData.access_token,
      });
    },
  }),
};
