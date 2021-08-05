var express = require("express");
var router = express();
var bodyParser = require("body-parser");
var getIP = require("ipware")().get_ip;
var conf = require("./config.json");
var request = require("superagent");

/* Body Parser */
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

/* Inquiry Credit */
router.post("/", function (req, res, next) {
  /* Get IP first */
  var ipInfo = getIP(req);
  var clientip = ipInfo.clientIp;
  /* Request Body */
  var dataReq = {
    sisi1: req.body.sisi1,
    sisi2: req.body.sisi2,
    sisi3: req.body.sisi3,
  };
  console.log(
    "Request to API: " + conf.url.inqA + " " + JSON.stringify(dataReq)
  );   

  // variabel regex untuk mengecek abjad didalam string dan alfabet didalam string (sesuai kondisi)
  const regexfornum = /[0-9]/g; //untuk mengecek angka
  const regexforalp = /[a-zA-Z\\s]/g; //untuk mengecek huruf besar dan kecil
  const regex_symbols = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/; //untuk mengecek character
  const regex_char = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g; //untuk mengecek character,angka, dan abjad
  const regexSpace = /\s/; //untuk mengecek spasi
  const regexZero = /^0*$/; //untuk mengecek hanya "0"
  const regexLeadZer0 = /^0+/; //untuk mengecek "0" didepan

  //deklarasi variabel-variabel yang dibutuhkan untuk menentukan jenis segitiga
  var jenis;
  var keliling;
  var sisiA = parseInt(dataReq.sisi1);
  var sisiB = parseInt(dataReq.sisi2);
  var sisiC = parseInt(dataReq.sisi3);
  // pengkondisian untuk memilih data yang tepat sesuai kondisi (abjad==abcdefg & simbol)
  if (
    dataReq.sisi1.match(regexforalp) == null &&
    dataReq.sisi2.match(regexforalp) == null &&
    dataReq.sisi3.match(regexforalp) == null &&
    dataReq.sisi1.match(regex_symbols) == null &&
    dataReq.sisi2.match(regex_symbols) == null &&
    dataReq.sisi3.match(regex_symbols) == null &&
    dataReq.sisi1.match(regexSpace) == null &&
    dataReq.sisi2.match(regexSpace) == null &&
    dataReq.sisi3.match(regexSpace) == null &&
    dataReq.sisi1.match(regexZero) == null &&
    dataReq.sisi2.match(regexZero) == null &&
    dataReq.sisi3.match(regexZero) == null &&
    dataReq.sisi1.match(regexLeadZer0) == null &&
    dataReq.sisi2.match(regexLeadZer0) == null &&
    dataReq.sisi3.match(regexLeadZer0) == null
  ) {
    //Melakukan pengkondisian untuk mencari bentuk segitiga berdasarkan jenisnya acuan Panjang
    // c2 = b2 + a2
    if ((sisiC * sisiC) == (sisiB * sisiB) + (sisiA * sisiA)) {
      if ((sisiA == sisiB) || (sisiA == sisiC)) {
        jenis = "Segitiga Siku-siku Sama Kaki";
        keliling = (parseInt(dataReq.sisi1) + parseInt(dataReq.sisi2) + parseInt(dataReq.sisi3)) + "cm";
      } else {
        jenis = "Segitiga Siku-siku";
        keliling = (parseInt(dataReq.sisi1) + parseInt(dataReq.sisi2) + parseInt(dataReq.sisi3)) + "cm";
      }
    }
    // b2 = c2 + a2
    else if ((sisiB * sisiB) == (sisiC * sisiC) + (sisiA * sisiA)) {
      if ((sisiA == sisiB) || (sisiA == sisiC)) {
        jenis = "Segitiga Siku-siku Sama Kaki";
        keliling = (parseInt(dataReq.sisi1) + parseInt(dataReq.sisi2) + parseInt(dataReq.sisi3)) + "cm";
      } else {
        jenis = "Segitiga Siku-siku";
        keliling = (parseInt(dataReq.sisi1) + parseInt(dataReq.sisi2) + parseInt(dataReq.sisi3)) + "cm";
      }
    }
    // a2 = c2 + b2
    else if ((sisiA * sisiA) == (sisiC * sisiC) + (sisiB * sisiB)) {
      if ((sisiA == sisiB) || (sisiA == sisiC)) {
        jenis = "Segitiga Siku-siku Sama Kaki";
        keliling = (parseInt(dataReq.sisi1) + parseInt(dataReq.sisi2) + parseInt(dataReq.sisi3)) + "cm";
      } else {
        jenis = "Segitiga Siku-siku";
        keliling = (parseInt(dataReq.sisi1) + parseInt(dataReq.sisi2) + parseInt(dataReq.sisi3)) + "cm";
      }
    }
    // Jenis Segitiga lainnya
    else if (sisiA == sisiB || sisiB == sisiC) {
      jenis = "Segitiga Sama Sisi";
      keliling = (parseInt(dataReq.sisi1) + parseInt(dataReq.sisi2) + parseInt(dataReq.sisi3)) + "cm";
    } else if (sisiA == sisiB || sisiA == sisiC) {
      jenis = "Segitiga Sama Kaki";
      keliling = (parseInt(dataReq.sisi1) + parseInt(dataReq.sisi2) + parseInt(dataReq.sisi3)) + "cm";
    } else {
      jenis = "Segitiga Sembarang";
      keliling = (parseInt(dataReq.sisi1) + parseInt(dataReq.sisi2) + parseInt(dataReq.sisi3)) + "cm";
    }
    var dataRes = {
      judul: "Segitiga Berdasarkan Panjang Sisi",
      rsp: "000",
      rspdesc: "Success",
      sisi: "ketiga sisi segitiga= " +
        dataReq.sisi1 +
        "cm" +
        " " +
        dataReq.sisi2 +
        "cm" +
        " " +
        dataReq.sisi3 +
        "cm",
      jenis_segitiga: jenis,
      keliling_segitiga: keliling
    };
    // Pengkondisian bila diisi character dan abjad
  } else if (
    dataReq.sisi1.match(regexfornum) != null ||
    dataReq.sisi2.match(regexfornum) != null ||
    dataReq.sisi3.match(regexfornum) != null ||
    dataReq.sisi1.match(regex_symbols) != null ||
    dataReq.sisi2.match(regex_symbols) != null ||
    dataReq.sisi3.match(regex_symbols) != null ||
    dataReq.sisi1.match(regexSpace) != null ||
    dataReq.sisi2.match(regexSpace) != null ||
    dataReq.sisi3.match(regexSpace) != null ||
    dataReq.sisi1.match(regexZero) != null ||
    dataReq.sisi2.match(regexZero) != null ||
    dataReq.sisi3.match(regexZero) != null ||
    dataReq.sisi1.match(regexLeadZer0) != null ||
    dataReq.sisi2.match(regexLeadZer0) != null ||
    dataReq.sisi3.match(regexLeadZer0) != null
  ) {
    var dataRes = {
      rsp: "005",
      rspdesc: "Invalid Format Type of Data - Hanya angka, tidak boleh nol didepan & tidak boleh kosong !",
    };
  }

  res.send(dataRes);
  console.log(
    "Response to client: " + clientip + " " + JSON.stringify(dataRes)
  );
});

module.exports = router;
