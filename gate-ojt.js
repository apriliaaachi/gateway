var express = require('express')
var router = express()
var bodyParser = require('body-parser')
var conf = require('./ojt/config.json')

/* router */


/* Body Parser */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

/* use Function */


console.log('The Gateway on port:' + conf.port)
router.listen(conf.port, '0.0.0.0')
