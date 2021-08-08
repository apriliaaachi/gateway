const express = require('express')
const router = express()
const bodyParser = require('body-parser')
const conf = require('./config/config-port.json')

/* router */
const decryption = require('./decryption/app')
const encryption = require('./encryption/app')
const segitiga = require('./segitiga/app')
const parsingNumber = require('./parsingnumber/app')
const primeNumber = require('./prime-numbers/app')

/* body parser */
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }))

/* use function */
router.use('/decryption', decryption)
router.use('/encryption', encryption)
router.use('/triangle', segitiga)
router.use('/parsing-number', parsingNumber)
router.use('/prime-number', primeNumber)

console.log('The Gateway on port:' + conf.port);
router.listen(conf.port, '0.0.0.0');