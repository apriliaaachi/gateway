const express = require("express");
const router = express();
const bodyParser = require("body-parser");
const conf = require("./config/config-port.json");

/* router */
const bayu = require("./bayu/app");

/* body parser */
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* use function */
router.use("/bayu", bayu);

console.log("The Gateway on port:" + conf.port);
router.listen(conf.port, "0.0.0.0");
