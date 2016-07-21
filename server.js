var express = require('express')
var path = require('path')
var fs = require('fs')
var moment = require('moment');
var app = express();

app.get('/', function (req, res) {
    var fileName = path.join(__dirname,'index.html');
    res.sendFile(fileName, function(err){
        if (err){
            console.log(err)
            res.status(err.status).end();
        }else{
            console.log('Sent:',fileName);
        }
    })
});

app.listen(8080, function () {
  console.log('App listening on port 8080!');
});

app.get('/:datestring', function(req, res){
    var myDate;
    if(/^\d{8,}$/.test(req.params.datestring)) {
        myDate = moment(req.params.datestring, "X");
    } else {
        myDate = moment(req.params.datestring, "MMMM D, YYYY");
    }
    
    if (myDate.isValid()){
        res.json({
          unix: myDate.format("X"),
          natural: myDate.format("MMMM D, YYYY")
        });
    }else{
        res.json({
            unix:null,
            natural: null
        })
    }
})