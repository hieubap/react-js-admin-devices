import clientUtils from "@/utils/client-utils";
import StorageUtils from "@/utils/storage-utils";

export default {
  state: {
    authenticationData: {},
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
    initApplication: ({ history } = {}, state) => {
      return new Promise(async (resolve, reject) => {
        let authLocalStorage;
        try {
          authLocalStorage = await StorageUtils.read(`auth`);
        } catch (e) {}

        clientUtils.auth = `Bearer ${authLocalStorage?.access_token}`;

        dispatch.auth.setAuthenticationData({ authData: authLocalStorage });
        // if (window.location.pathname === "/") {
        //   history.push("/tutorial");
        // }
      });
    },
  }),
};
