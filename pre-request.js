import { prerequest } from './pre-request.js'
var CryptoJS = require("crypto-js");

var publicKey = "bfaa9a45-5c5a-4bbc-b353-eb6989486c87";
var privateKey = CryptoJS.enc.Base64.parse("x7uNykwHN3F4ATXMqVcWcCqrc2PnNId7mZ0Ei6IfIMY=");

var timestamp = '1591966347.566';
var nonce = timestamp;
    
var body = "";

if (body.length > 0){
    var utf8Body = CryptoJS.enc.Utf8.parse(body);
    var hashedBody = CryptoJS.SHA256(utf8Body);
    var bodySignature = CryptoJS.enc.Base64.stringify(hashedBody);
}
else {
    var bodySignature = "";
}


var unsignedSignature = publicKey + ":" + nonce + ":" + timestamp + ":" + bodySignature;
var utf8Signature = CryptoJS.enc.Utf8.parse(unsignedSignature);
var hashedSignature = CryptoJS.HmacSHA256(utf8Signature, privateKey);
var signedSignature = CryptoJS.enc.Base64.stringify(hashedSignature);
var hmac = publicKey + ":" + nonce + ":" + timestamp + ":" + signedSignature;
