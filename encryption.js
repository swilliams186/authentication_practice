const crypto = require("crypto");
const keys = require("./logindata.js")

// const key = crypto.randomBytes(32); //Need 32 bytes (256 bits) key as we are using AES-256 encryption
const key = keys.key;
// const iv = crypto.randomBytes(16); //Need 16 bytes (128 bits) Initialization vector as default block size is 128 bits
const iv = keys.iv;

exports.encrypt = function(plainString) {
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = Buffer.concat([cipher.update(Buffer.from(plainString, "utf-8")), cipher.final()]);
    return encrypted.toString("base64");
}

exports.decrypt = function(base64String) {
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    const deciphered = Buffer.concat([decipher.update(Buffer.from(base64String, "base64")), decipher.final()]);
    return deciphered.toString("utf8");
}



