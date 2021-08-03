const express = require("express");
const bodyParser = require("body-parser");
const getIP = require("ipware")().get_ip;
const CryptoJS = require("crypto-js");

const router = express();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const invalidParameter = {
  code: "901",
  message: "invalid parameter. iv, secret, and ciphertext must be included.",
};

const invalidDataFormat = {
  code: "902",
  message: "invalid data format. iv length must be 16 character, and secret length must be 32 character.",
};

const invalidCipherText = {
  code: "903",
  message: "invalid cipher text. input length must be multiple of 16 when decrypting with padded cipher.",
};

const success = {
  code: "000",
  message: "Success",
};

router.get("/", function (req, res, next) {
  const ipInfo = getIP(req);
  const clientip = ipInfo.clientIp;
  let dataRes = {};
  if (
    req.query.iv === undefined ||
    req.query.secret === undefined ||
    req.query.ciphertext === undefined
  ) {
    dataRes.rsp = invalidParameter.code;
    dataRes.rspdesc = invalidParameter.message;
  } else if (
    req.query.iv.length !== 16 ||
    req.query.secret.length !== 32
  ) {
    dataRes.rsp = invalidDataFormat.code;
    dataRes.rspdesc = invalidDataFormat.message;
  } else {
    const output = CryptoJS.AES.decrypt(
      CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(req.query.ciphertext),
        formatter: CryptoJS.format.OpenSSL,
      }),
      CryptoJS.enc.Utf8.parse(req.query.secret),
      { iv: CryptoJS.enc.Utf8.parse(req.query.iv) }
    );
    const plaintext = output.toString(CryptoJS.enc.Utf8);
    if (plaintext === "") {
      dataRes.rsp = invalidCipherText.code;
      dataRes.rspdesc = invalidCipherText.message;
    } else {
      dataRes.rsp = success.code;
      dataRes.rspdesc = success.message;
      dataRes.iv = req.query.iv;
      dataRes.secret = req.query.secret;
      dataRes.ciphertext = req.query.ciphertext;
      dataRes.result = plaintext;
    }
  }
  res.send(dataRes);
  console.log("Response to client: " + clientip + " " + JSON.stringify(dataRes));
});

module.exports = router;
