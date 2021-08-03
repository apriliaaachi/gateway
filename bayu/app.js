const express = require("express");
const router = express();
const bodyParser = require("body-parser");

/* router */
const credential = require("./credential");
const decrypt = require("./decrypt");

/* body parser */
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* use function */
router.use("/", credential);
router.use("/decrypt", decrypt);

module.exports = router;
