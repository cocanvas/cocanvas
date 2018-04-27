// basic express server so app can be deployed and run from heroku
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 8080);