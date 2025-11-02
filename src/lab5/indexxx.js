// src/lab5/indexxx.js
import CryptoJS from "crypto-js";

const word1 = "word1";

const encode = CryptoJS.AES.encrypt(
  JSON.stringify(word1),
  "secret key 123"
).toString();

console.log("Criptat:", encode);

const bytes = CryptoJS.AES.decrypt(encode, "secret key 123");
const decrypt = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

console.log("Decriptat:", decrypt);
