var express = require('express')
var router = express()
var bodyParser = require('body-parser')

/* router */
var credential = require('./credential')
var primenumbers = require('./primenumber')

/* Body Parser */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

/* use Function */
router.use('/', credential)
router.use('/prime-numbers', primenumbers)

module.exports = router
