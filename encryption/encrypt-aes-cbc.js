var express = require('express')
var router = express()
var bodyParser = require('body-parser')
var getIP = require('ipware')().get_ip
const crypto = require("crypto");

/* Body Parser */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))

/* Encryption AES 256 CBC */
router.get('/', function (req, res) {
    /* Get IP first */
    var ipInfo = getIP(req)
    var clientip = ipInfo.clientIp

    /* Change Data */
    var data = {
        IV: crypto.randomBytes(10).toString('base64'),
        KEY: crypto.randomBytes(22).toString('base64'),
        TEXT: req.query.password
    }
    console.log('Data: ' + JSON.stringify(data))
    console.log('Length' + data.TEXT.length)

    if (data.TEXT.length == 0) {
        var dataRes = {
            'rsp': "997",
            'rspdesc': "Invalid format",
            'iv': data.IV,
            'secret-key': data.KEY,
            'password-encrypted': encrypted,
        }
    } else {
        var cipher = crypto.createCipheriv('aes-256-cbc', data.KEY, data.IV);
        var encrypted = cipher.update(data.TEXT, 'utf8', 'base64');
        encrypted += cipher.final('base64');

        var dataRes = {
            'rsp': "000",
            'rspdesc': "Success",
            'iv': data.IV,
            'secret-key': data.KEY,
            'password-encrypted': encrypted,
        }
    }



    res.send(dataRes)
    console.log('Response to client: ' + clientip + ' ' + JSON.stringify(dataRes))
})

module.exports = router