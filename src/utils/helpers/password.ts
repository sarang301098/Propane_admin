import CryptoJS from "crypto-js";

export const setWithExpiry = async (
  key: string,
  password: string,
  email: string,
  time: number
) => {
  const encryptPassword = await CryptoJS.AES.encrypt(password, key).toString();
  const now = new Date();

  const item = {
    email: email,
    password: encryptPassword,
    expiry: now.getTime() + time * 3600000,
  };
  localStorage.setItem("rememberMe", JSON.stringify(item));
};

export const getWithExpiry = (key: string) => {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  const decryptPassword = CryptoJS.AES.decrypt(item.password, "encPass");
  const originalPassword = decryptPassword.toString(CryptoJS.enc.Utf8);

  return {
    email: item.email,
    password: originalPassword,
  };
};
