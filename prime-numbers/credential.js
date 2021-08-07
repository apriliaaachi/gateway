var express = require('express')
var router = express()
var bodyParser = require('body-parser')
var getIP = require('ipware')().get_ip
var conf = require('./config.json')
var _ = require('lodash')

/* Body Parser */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

/* protect Key */
router.use('/', function (req, res, next) {
  /* logger */
  var ipInfo = getIP(req)
  var clientip = ipInfo.clientIp
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
  console.log('---------------------------------------------------------------')
  console.log(
    'Request from client: ' + clientip +
      ' url:' + fullUrl +
      ' ' + JSON.stringify(req.body) + ' '
  )

  /* Cek The Key */
  var passwd = _.find(conf.credential, { id: req.headers.id, key: req.headers.key })
  if (passwd) {
    next()
  } else {
    console.log('Error: Invalid Credential. ' + 'Client Credential ==> id: ' + req.headers.id + ' key: ' + req.headers.key)
    var dataRes = {
      'rsp': '998',
      'rspdesc': 'Access Denied'
    }
    res.send(dataRes)
    console.log('Response to client: ' + clientip + ' ' + JSON.stringify(dataRes))
  }
})

module.exports = router
