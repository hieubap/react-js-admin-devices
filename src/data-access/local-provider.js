import CryptoJS from "crypto-js";
const LocalStorageProvider = {
  save(key, value) {
    return new Promise((resolve, reject) => {
      try {
        var data = { value };
        let data2 = CryptoJS.AES.encrypt(JSON.stringify(data), "SOMETHING");
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
      item = CryptoJS.AES.decrypt(item, "SOMETHING").toString(CryptoJS.enc.Utf8);
      if (item)
        try {
          var data = JSON.parse(item);
          if (data && data.value) {
            return data.value;
          }
        } catch (error) {}
    }
    return defaultValue;
  },
};
export default LocalStorageProvider;
