import { enc } from "crypto-js";
import AES from "crypto-js/aes";

// Encrypt function
export function encryptMessage(message: string, key: string) {
  return AES.encrypt(message, key).toString();
}

// Decrypt function
export function decryptMessage(encryptedMessage: string, key: string) {
  const bytes = AES.decrypt(encryptedMessage, key);
  return bytes.toString(enc.Utf8);
}
