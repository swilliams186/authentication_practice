const crypto = require("crypto");
const keys = require("./logindata.js")
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const key = crypto.randomBytes(32); //Need 32 bytes (256 bits) key as we are using AES-256 encryption
const key = keys.key;
// const iv = crypto.randomBytes(16); //Need 16 bytes (128 bits) Initialization vector as default block size is 128 bits
const iv = keys.iv;

exports.encrypt = function (plainString) {
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = Buffer.concat([cipher.update(Buffer.from(plainString, "utf-8")), cipher.final()]);
    return encrypted.toString("base64");
}

exports.decrypt = function (base64String) {
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    const deciphered = Buffer.concat([decipher.update(Buffer.from(base64String, "base64")), decipher.final()]);
    return deciphered.toString("utf8");
}

exports.hash = function (stringToHash) {
    const hash = crypto.createHash("sha256");
    hash.update(stringToHash);
    const hashedText = hash.digest("utf8");
    return hashedText;
}


//This isn't required as bcrypt stores the salt inside the output string
exports.genSalt = bcrypt.genSalt(function (err, hash) {
    if (err) {
        console.log("error with genSalt ");
        console.log(err);
    } else {
        return hash;
    }
});

exports.hashWithSaltRounds = async function (plainText) {
    return bcrypt.hash(plainText, saltRounds);
};

exports.checkSaltedHash = async function (plainText, hash) {
    return await bcrypt.compare(plainText, hash);
};

