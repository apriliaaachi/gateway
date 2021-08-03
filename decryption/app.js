const express = require("express");
const router = express();
const bodyParser = require("body-parser");

/* router */
const credential = require("./credential");
const aes256cbc = require("./aes256cbc");

/* body parser */
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* use function */
router.use("/", credential);
router.use("/aes256cbc", aes256cbc);

module.exports = router;
