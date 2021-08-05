var express = require("express");
var router = express();
var bodyParser = require("body-parser");

/* router */
var credential = require("./credential");
var DeTriangle = require("./detriangle");

/* Body Parser */
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* use Function */
router.use("/", credential);
router.use("/DeTriangle", DeTriangle);

module.exports = router;
