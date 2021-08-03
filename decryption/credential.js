const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const getIP = require("ipware")().get_ip;
const conf = require("./config.json");
const _ = require("lodash");

/* body parser */
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* protect Key */
router.use("/", function (req, res, next) {
  /* logger */
  const ipInfo = getIP(req);
  const clientip = ipInfo.clientIp;
  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  console.log("---------------------------------------------------------------");
  console.log("Request from client: " + clientip + " url:" + fullUrl + " " + JSON.stringify(req.body) + " ");

  /* check key */
  const passwd = _.find(conf.credential, {
    id: req.headers.id,
    key: req.headers.key,
  });
  if (passwd) {
    next();
  } else {
    console.log("Error: Invalid Credential. Client Credential ==> id: " + req.headers.id + " key: " + req.headers.key);
    const dataRes = {
      rsp: "998",
      rspdesc: "Access Denied",
    };
    res.send(dataRes);
    console.log("Response to client: " + clientip + " " + JSON.stringify(dataRes));
  }
});

module.exports = router;
