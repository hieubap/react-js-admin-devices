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
    setAuthenticationData({ authData = {} }) {
      console.log(authData, "authData");
      dispatch.auth.updateData({
        authenticationData: authData,
        token: authData.access_token,
      });
    },
  }),
};
