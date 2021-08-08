var express = require('express')
var router = express()
var bodyParser = require('body-parser')
var getIP = require('ipware')().get_ip
var conf = require('./config.json')
var request = require('superagent')
var math = require ('math')
const { has } = require('lodash')

/* Body Parser */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

/* Inquiry Credit */
router.post('/', function (req, res, next) {
  /* Get IP first */
  var ipInfo = getIP(req)
  var clientip = ipInfo.clientIp
  /* Change Data */
  var dataReq = {
    input : req.body.input
  }
  console.log('Request to API: ' + conf.url.inqA + ' ' + JSON.stringify(dataReq))

  var regexfornumber =/[0-9]/
  var regexforalp = /[a-zA-Z\\s]/g
  var regexforchar = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/
  var regexforspace = /\s/
  var regexfordoublespace1 = /.*\s\s\s*./.test(dataReq.input)
  var regexfordoublespace2 = /^\s/.test(dataReq.input)
  var regexfordoublespace3 = /\s$/.test(dataReq.input)
  var regexleadzero =/^[0]+./.test(dataReq.input)

if (dataReq.input=== ""){ 
    var dataRes={
    'rsp' : '997',
    'rspdesc' : 'Input is required'
    } 
}
else if (dataReq.input.match(regexfornumber)!== null && dataReq.input.match(regexforalp) === null){
  var inputangka = dataReq.input
  var tbr;
  function NumberToText(n){
      var ang = new Array(" ","satu","dua","tiga","empat","lima","enam","tujuh","delapan","sembilan","sepuluh","sebelas")
      var n = inputangka
      if (n== 0){tbr='nol';}
      else if (n<12){tbr=ang[n];}
      else if (n<20){tbr=(ang[n-10])+" belas";}
      else if (n<100){tbr=(ang[Math.floor(n/10)])+ " puluh "+ (ang[n%10]);}
      else if (n<200){
          if ((n%100)<=11){tbr="seratus "+ (ang[n%100]);}
          else if ((n%100)>11 && (n%100)<=19){tbr="seratus "+ (ang[(n%10)])+" belas";}
          else if ((n%100)>19){tbr="seratus "+ (ang[Math.floor((n/10)%10)])+ " puluh "+ (ang[n%10]);}}
      else if (n<1000){
        if ((n%100)<=11){tbr=(ang[(Math.floor(n/100))])+" ratus "+ (ang[n%100]);}
        else if ((n%100)>11 && (n%100)<=19){tbr=(ang[(Math.floor(n/100))])+" ratus "+ (ang[(n%10)])+" belas";}
        else if ((n%100)>19){tbr=(ang[(Math.floor(n/100))])+" ratus "+ (ang[Math.floor((n/10)%10)])+ " puluh "+ (ang[n%10]);}}
      return tbr;
  }
    if (inputangka.match(regexforchar)!= null || inputangka.match(regexforspace)!= null){
        var dataRes={
        'rsp' : '997',
        'rspdesc' : 'Invalid inputangka. Allow only numeric input'
        } 
      }
      else if (inputangka.length > 3){ 
        var dataRes={
        'rsp' : '997',
        'rspdesc' : 'Invalid inputangka. Allow only numeric input not more than 3 digits'
        } 
      }
      else if (regexleadzero === true){
        var dataRes={
          'rsp' : '997',
          'rspdesc' : 'Invalid inputangka. Not allowed to start input with 0'
          }
      }
      else {
        NumberToText (inputangka) 
        var dataRes={
          'rsp' : '000',
          'rspdesc' : 'Success',
          'terbilang': tbr,
        }
      }
}   
else if (dataReq.input.match(regexforalp)!== null && dataReq.input.match(regexfornumber) === null){
  var inputterbilang = dataReq.input
  var numbers = new Array("puluh","satu","dua","tiga","empat","lima","enam","tujuh","delapan","sembilan","sepuluh","sebelas")
  var kata = inputterbilang.toLowerCase();
  var arrkata = kata.split(' ');

  var angka1 = ["satu","dua","tiga","empat","lima","enam","tujuh","delapan","sembilan","sepuluh", "sebelas","belas", "puluh"
  ,"seratus","ratus"]
  var hasil = arrkata.filter(d => !angka1.includes(d));
  if (hasil.length=== 0){
      function TextToNumber (index) {
      return numbers.indexOf(index)!==-1 ? numbers.indexOf(index):""
    }
    var toNumber = arrkata.map((angka, index, {length}) => 
        angka === "puluh" && index + 1 === length ? '0': //20,30,40
        angka === "puluh" && index +1 === length-1 ? '' : //23
        angka === "seratus" && arrkata[index+1] ==="sebelas" ? "1"+ TextToNumber(angka): //111
        angka === "seratus" && arrkata[index+1] ==="sepuluh"? "1"+ TextToNumber(angka): //110
        arrkata[index+1] ==="sebelas"? TextToNumber(angka): //111
        arrkata[index+1] ==="sepuluh"? TextToNumber(angka): //110
        angka === "ratus" && index+1 ===length ? '00': //200,300
        angka === "ratus" && index+1 === length-1 ? '0': //201-209
        angka === "ratus" && index+2 === length-2 ? '': //221
        arrkata[index+1] ==="belas"? "1"+ TextToNumber(angka): //12
        angka === "seratus" && index+1 === length-1? "1" + '0': //101-109
        angka === "seratus" && index+2 === length-2 ? "1"+'': //121
        angka === "seratus" && index+2 === length-1 ? "1"+''://112-119
        angka === "seratus" ?'100':
        angka === "nol" ? '0' : TextToNumber(angka))
        .join('')
        
        TextToNumber(inputterbilang)
        var dataRes={
            'rsp' : '000',
            'rspdesc' : 'Success',
            'angka' : toNumber
          }
        } 
  else {
    var dataRes={
      'rsp' : '997',
      'rspdesc' : 'Input text is wrong',
        }
      }
    }
else{
  var dataRes={
    'rsp' : '997',
    'rspdesc' : 'Invalid input. Allow numeric or alphabet input only'
      }
      console.log("kondisi tiga");
    }  
    res.send(dataRes)
    console.log('Response to client: ' + clientip + ' ' + JSON.stringify(dataRes))
})
module.exports = router