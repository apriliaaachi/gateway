var express = require('express')
var router = express()
var bodyParser = require('body-parser')
var getIP = require('ipware')().get_ip

//const { userValidationRules, validate } = require('./priscillia3.js')

/* Body Parser */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

//CHECK IF INPUT HAS LETTERS/SPECIAL CHARACTERS
function areCharsOrLetters(theString) {
    var regSpecialChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    var isChar = regSpecialChar.test(theString)
    var isLetter = theString.match(/[a-z]/i)
    if (isChar != false && isLetter != null) {
        return true
    } else if (isLetter != null) {
        return true
    } else if (isChar != false) {
        return true
    } else {
        return false
    }
}

//CHECK IF INPUT HAS WHITESPACE
function containsWhitespace(txt) {
    var whitespace = /\s/.test(txt)
    if (whitespace == true) { //check if string has spaces
        var matched1 = /^\s|\s$/.test(txt)
        var matched2 = /(?<=\d)\s+(?=[0-9a-zA-Z])/.test(txt)
        var matched3 = /^\s+$/.test(txt) //check if input all spaces
        console.log(matched1)
        console.log(matched2)
        if (matched1 != false && matched2 != false) { //check spaces at both ends
            console.log("Invalid format")
            return true
        } else if (matched3 != false) {
            console.log("bro stop it, it's only space")
            return null
        } else if (matched1 != false) {
            var newNum = txt.trim()
            txt = newNum
            console.log("modified input: (" + newNum + ")")
            return newNum
        } else {
            console.log("errrrrooooorrrrr")
            return true
        }
    } else {
        if (txt === "") {
            console.log("this is empty")
            return null
        }
        return txt
    }
}

//Check if input contains letters
//function containsLetters(_int) {
//    let matched2 = _int.match(/[a-z]/i)
//    if (matched2 != null) {
//        return true
//    } else {
//        return false
//    }
//}

//CHECK PRIME NUMBERS
function primeNumbers(num) {
    var cekDigit = num.length
    var toInt = parseInt(num)
    if (cekDigit > 3) {
        return null
    } else {
        for (var i = 2; i < toInt; i++) {
            if (toInt % i === 0) {
                return false
            }
        }
        return toInt >= 2
    }
}

//FUNGSI TIDAK DIPAKAI
function isEmpty(obj) {
    for (var i in obj) {
        if(obj.hasOwnProperty(i))
            return false;
    }
    return true
}

//console.log(primeNumbers(23))

/* CHECKING PRIMARY NUMBERS */
router.post('/', function (req, res, next) {
    var ipInfo = getIP(req)
    var clientip = ipInfo.clientIp
    var dataReq = {
        checkPrime: req.body.checkPrime
    }
    
    var returnVal = containsWhitespace(dataReq.checkPrime)
    //var inputVal = dataReq.checkPrime.value
    if (containsWhitespace(dataReq.checkPrime) === null) {
        var dataRes = {
            'rsp': "001",
            'rspdesc': "Input can't be empty"
        }
    } else if (areCharsOrLetters(dataReq.checkPrime) === true) {
        var dataRes = {
            'rsp': "002",
            'rspdesc': "No letters or special characters allowed"
        }
        console.log("bro can't put illegal chars")
    } else if (containsWhitespace(dataReq.checkPrime) === true) {
        var dataRes = {
            'rsp': "998",
            'rspdesc': "Invalid format"
        }
    } else if (containsWhitespace(dataReq.checkPrime) === returnVal){
        var primeNum = primeNumbers(returnVal)
        if (primeNum == null) {
            var dataRes = {
                'rsp': "003",
                'rspdesc': "Only accepts max of 999",
            }
        } else {
            var dataRes = {
                'rsp': "000",
                'rspdesc': "Success",
                'prime number': primeNum
            }
        }
    } else {
        var dataRes = {
            'rsp': "999",
            'rspdesc': "General error"
        }
    }

    res.send(dataRes)
    console.log('Response to client: ' + clientip + ' ' + JSON.stringify(dataRes))
})

module.exports = router