import { ethers } from "ethers";
import i18n from "i18next";
import moment from "moment";

export const strings = (name, params = {}) => {
  return i18n.t(name, params);
};

export const isExpiredRequest = (req) => {
  return moment.unix(req.createdAt._hex).add(1, "day").isBefore(moment());
};

export const parseEther = (amount) => {
  if (typeof amount === "number") {
    amount = amount.toString();
  }
  return ethers.utils.parseEther(amount);
};

export const x10_18 = (value) => {
  return ethers.utils.parseUnits(
    typeof value == "string" ? value : value.toString(),
    18
  );
};

export const shortenTime = (totalSeconds) => {
  const roundedSeconds = Math.round(totalSeconds);
  const minutes = Math.floor(roundedSeconds / 60);
  const seconds = roundedSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? "0" + day : day;
  const formattedMonth = month < 10 ? "0" + month : month;

  return formattedDay + "/" + formattedMonth + "/" + year;
};

export const formatPrice = (input) => {
  if (!input) return input;
  const str = input + "";
  try {
    return (
      parseInt(str)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
        .replace(".00", "")
        .replace(/,/g, ".") + "đ"
    );
  } catch (error) {}
  return str;
};
