var express = require("express");
var fs = require("fs");
var request = require("request");
const app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit:'50mb', extended: true }));

var server = app.listen(3000, function(){
    //console.log("server is online : " + server.address().port);
})

app.post("/upload", function(req, res){
    var data = {
        image: req.body.image
    };

    var headers = {
      'Content-Type':'application/json'
    }

    var options = {
      url: 'http://172.20.10.2:3000/upload',
      method: 'POST',
      headers: headers,
      form: {
          'image': req.body.image
      }
    }
    
    request(options, function (error, response, body) {
      //コールバックで色々な処理
      url = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+response.body;
      console.log(url);
      res.send(url);
    })
})
