var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public/app'));

app.all('*', function (req, res) {
	res.statusCode = 404;
	res.sendfile('./public/app/404.html');
});

app.get('/', function (req, res) {
	res.sendfile('./public/app/index.html');
});

app.listen(8000);