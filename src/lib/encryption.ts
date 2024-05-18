import CryptoJS from "crypto-js";

const password: string = "myPassword";

interface DecryptionParams {
  encryptedData: string;
  ivValue: string;
  saltValue: string;
  password: string;
}

export const generateKey = (password: string) => {
  const salt = CryptoJS.lib.WordArray.random(128 / 8);
  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
    iterations: 100000,
  }).toString();
  return { key, salt: salt.toString(CryptoJS.enc.Hex) };
};

export const encryptData = (data: string, key: string, salt: string) => {
  const iv = CryptoJS.lib.WordArray.random(128 / 8);

  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const encryptedData = encrypted.toString();
  const ivValue = iv.toString(CryptoJS.enc.Hex);
  const saltValue = salt; // Salt is already a Hex string

  return { encryptedData, ivValue, saltValue };
};

export const sampleSendData = (data: string) => {
  const { key, salt } = generateKey(password);
  const { encryptedData, ivValue, saltValue } = encryptData(data, key, salt);
  console.log({ encryptedData, ivValue, saltValue });
  return { encryptedData, ivValue, saltValue };
};

export const decryptData = ({
  encryptedData,
  ivValue,
  saltValue,
  password,
}: DecryptionParams): string => {
  const salt = CryptoJS.enc.Hex.parse(saltValue);
  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
    iterations: 100000,
  });

  const iv = CryptoJS.enc.Hex.parse(ivValue);
  const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};
