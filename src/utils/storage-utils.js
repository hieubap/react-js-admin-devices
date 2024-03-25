import CryptoJS from "crypto-js";
const StorageUtils = {
  save(key, value) {
    return new Promise((resolve, reject) => {
      try {
        var data = { value };
        let data2 = CryptoJS.AES.encrypt(
          JSON.stringify(data),
          "SOMETHING"
        ).toString();
        localStorage.setItem(key, data2.toString());
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  },
  read(key, defaultValue) {
    if (localStorage.hasOwnProperty(key)) {
      var item = localStorage.getItem(key);
      console.log(item, "item", key);
      let decryptData = CryptoJS.AES.decrypt(item, "SOMETHING").toString(
        CryptoJS.enc.Utf8
      );
      console.log(decryptData, "item");
      if (decryptData)
        try {
          var data = JSON.parse(decryptData);
          if (data && data.value) {
            return data.value;
          }
        } catch (error) {}
    }
    return defaultValue;
  },
};
export default StorageUtils;
