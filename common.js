global.request = require('supertest')
global.constants = require('./constants');
global.CryptoJS = require("crypto-js");
global.base_url = 'https://sandbox-api.imbursepayments.com';
global.random = randomString();

generateHmac = async function(){
    const publicKey = constants.PUBLIC_KEY;
    const privateKey = CryptoJS.enc.Base64.parse(constants.PRIVATE_KEY);
    let timestamp = (new Date).getTime() / 1000;
    let nonce = timestamp;
    let bodySignature = "";
    let body = "";

    if (body.length > 0){
        let utf8Body = CryptoJS.enc.Utf8.parse(body);
        let hashedBody = CryptoJS.SHA256(utf8Body);
        bodySignature = CryptoJS.enc.Base64.stringify(hashedBody);
    }
    else {
        bodySignature = "";
    }
    let unsignedSignature = publicKey + ":" + nonce + ":" + timestamp + ":" + bodySignature;
    let utf8Signature = CryptoJS.enc.Utf8.parse(unsignedSignature);
    let hashedSignature = CryptoJS.HmacSHA256(utf8Signature, privateKey);
    let signedSignature = CryptoJS.enc.Base64.stringify(hashedSignature);
    let hmac = "Hmac "+publicKey + ":" + nonce + ":" + timestamp + ":" + signedSignature;

    return hmac;
};

function randomString() {
    return Math.random().toString(36).substring(3);
}

