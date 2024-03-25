import clientUtils from "@/utils/client-utils";

export default {
  getAbi(url) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi({ methodType: "get", url })
        ?.then((res) => {
          resolve(res);
        })
        ?.catch((e) => reject(e));
    });
  },
};
